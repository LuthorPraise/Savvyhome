import { getSiteImage } from "../data/site-images.js";

const DEFAULT_PHONE = "2348183196861";

const PAGE_NAMES = {
  "": "Home",
  "/": "Home",
  "/index.html": "Home",
  "/listings.html": "Listings",
  "/about.html": "About",
  "/services.html": "Services",
  "/contact.html": "Contact"
};

export function buildWhatsAppLink(message, phone = DEFAULT_PHONE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getPageNameFromPath(pathname) {
  return PAGE_NAMES[pathname] ?? PAGE_NAMES[new URL(pathname, "https://example.com").pathname] ?? "Home";
}

function getCurrentPageName() {
  return getPageNameFromPath(window.location.pathname);
}

function lockBodyScroll(locked) {
  const scrollTop = Number(document.body.dataset.scrollTop || window.scrollY);

  if (locked) {
    document.body.dataset.scrollTop = String(window.scrollY);
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add("nav-open");
    return;
  }

  document.body.classList.remove("nav-open");
  document.body.style.top = "";
  delete document.body.dataset.scrollTop;
  window.scrollTo(0, scrollTop);
}

function initHeaderState() {
  const header = document.querySelector("[data-site-header]");
  if (!header) {
    return;
  }

  const updateState = () => {
    header.classList.toggle("is-condensed", window.scrollY > 24);
  };

  updateState();
  window.addEventListener("scroll", updateState, { passive: true });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-nav]");
  const backdrop = document.querySelector("[data-nav-backdrop]");
  const closeButtons = document.querySelectorAll("[data-menu-close]");

  if (!toggle || !menu || !backdrop) {
    return;
  }

  if (menu.parentElement !== document.body || backdrop.parentElement !== document.body) {
    document.body.append(backdrop, menu);
  }

  const setState = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    backdrop.classList.toggle("is-visible", open);
    backdrop.hidden = !open;
    document.documentElement.classList.toggle("nav-open", open);
    lockBodyScroll(open);
  };

  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    setState(willOpen);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => setState(false));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setState(false);
    }
  });
}

function initCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function initSiteImages() {
  document.querySelectorAll("img[data-site-image]").forEach((image) => {
    const asset = getSiteImage(image.dataset.siteImage);
    if (!asset) {
      return;
    }

    image.src = asset.src;
    image.alt = asset.alt;
  });
}

function initNavCurrentState() {
  const currentPage = getCurrentPageName();

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initRevealObserver() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  targets.forEach((target) => observer.observe(target));
}

function renderFeaturedCard(listing) {
  const article = document.createElement("article");
  article.className = "listing-card";
  article.innerHTML = `
    <img src="${listing.image}" alt="${listing.alt}" loading="lazy" />
    <div class="listing-body">
      <div>
        <p class="detail-label">${listing.type}</p>
        <h3 class="list-title">${listing.title}</h3>
        <p class="list-copy">${listing.location}</p>
      </div>
      <div class="list-meta">
        <span>${listing.city}</span>
        <span>${listing.price}</span>
      </div>
      <a class="button button-whatsapp" href="${buildWhatsAppLink(
        `Hello Chiamaka, I would like to enquire about ${listing.title} in ${listing.location} listed at ${listing.price}.`
      )}" target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
    </div>
  `;
  return article;
}

async function initFeaturedListings() {
  const grid = document.querySelector("[data-featured-listings]");
  if (!grid) {
    return;
  }

  try {
    const response = await fetch("assets/data/listings.json");
    const listings = await response.json();
    const featured = listings.filter((listing) => listing.featured).slice(0, 3);
    grid.innerHTML = "";
    featured.forEach((listing) => {
      grid.appendChild(renderFeaturedCard(listing));
    });
  } catch (error) {
    grid.innerHTML = `<div class="empty-state">Featured listings will appear here shortly.</div>`;
    console.error(error);
  }
}

function initGenericWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
    const message = link.getAttribute("data-whatsapp-message");
    if (!message) {
      return;
    }

    link.setAttribute("href", buildWhatsAppLink(message));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });
}

function initContactForms() {
  document.querySelectorAll("[data-whatsapp-form='contact']").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        enquiry: String(formData.get("enquiry") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      if (!payload.name || !payload.phone || !payload.message) {
        form.querySelector("[data-form-note]").textContent =
          "Please complete your name, phone number, and message before continuing.";
        return;
      }

      const fullMessage = [
        "Hello Chiamaka, I would like to make an enquiry through Savvy Homes.",
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        payload.email ? `Email: ${payload.email}` : "",
        payload.enquiry ? `Enquiry type: ${payload.enquiry}` : "",
        `Message: ${payload.message}`
      ]
        .filter(Boolean)
        .join("\n");

      window.open(buildWhatsAppLink(fullMessage), "_blank", "noopener");
      form.reset();
      form.querySelector("[data-form-note]").textContent =
        "WhatsApp is opening with your prefilled message.";
    });
  });
}

function initTestimonials() {
  const shell = document.querySelector("[data-testimonials]");
  if (!shell) {
    return;
  }

  const panels = [...shell.querySelectorAll("[data-testimonial]")];
  const dots = [...shell.querySelectorAll("[data-testimonial-dot]")];
  const prev = shell.querySelector("[data-testimonial-prev]");
  const next = shell.querySelector("[data-testimonial-next]");

  let activeIndex = 0;
  let timerId = null;

  const render = (index) => {
    activeIndex = (index + panels.length) % panels.length;
    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      if (dotIndex === activeIndex) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const restartTimer = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    clearInterval(timerId);
    timerId = window.setInterval(() => {
      render(activeIndex + 1);
    }, 5000);
  };

  prev?.addEventListener("click", () => {
    render(activeIndex - 1);
    restartTimer();
  });

  next?.addEventListener("click", () => {
    render(activeIndex + 1);
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      render(index);
      restartTimer();
    });
  });

  render(0);
  restartTimer();
}

function initSite() {
  initSiteImages();
  initHeaderState();
  initMobileNav();
  initCurrentYear();
  initNavCurrentState();
  initRevealObserver();
  initGenericWhatsAppButtons();
  initFeaturedListings();
  initContactForms();
  initTestimonials();
}

if (typeof document !== "undefined") {
  initSite();
}
