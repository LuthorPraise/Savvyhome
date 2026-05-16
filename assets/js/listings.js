import { buildWhatsAppLink } from "./main.js";

export function filterListings(listings, cityFilter = "all", typeFilter = "all") {
  return listings.filter((listing) => {
    const matchesCity =
      cityFilter === "all" || listing.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesType =
      typeFilter === "all" || listing.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesCity && matchesType;
  });
}

export function buildListingMessage({ title, location, price }) {
  return [
    "Hello Chiamaka, I am interested in this Savvy Homes listing.",
    `Property: ${title}`,
    `Location: ${location}`,
    `Price: ${price}`,
    "Please share the next steps."
  ].join("\n");
}

function renderListingCard(listing) {
  const article = document.createElement("article");
  article.className = "listing-card";
  article.innerHTML = `
    <img src="${listing.image}" alt="${listing.alt}" loading="lazy" />
    <div class="listing-body">
      <div>
        <p class="detail-label">${listing.type}</p>
        <h2 class="list-title">${listing.title}</h2>
        <p class="list-copy">${listing.location}</p>
      </div>
      <div class="list-meta">
        <span>${listing.city}</span>
        <span>${listing.price}</span>
      </div>
      <a class="button button-whatsapp" href="${buildWhatsAppLink(
        buildListingMessage(listing)
      )}" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
    </div>
  `;
  return article;
}

function setActiveFilter(buttons, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filterValue === value);
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filterValue === value)
    );
  });
}

function initListingsPage() {
  const root = document.querySelector("[data-listings-root]");
  if (!root) {
    return;
  }

  const grid = root.querySelector("[data-listings-grid]");
  const cityButtons = [...root.querySelectorAll("[data-city-filter]")];
  const typeButtons = [...root.querySelectorAll("[data-type-filter]")];
  const panels = [...root.querySelectorAll("[data-inquiry-panel]")];
  const panelButtons = [...root.querySelectorAll("[data-inquiry-tab]")];
  let allListings = [];
  let currentCity = "all";
  let currentType = "all";

  const render = () => {
    const visibleListings = filterListings(allListings, currentCity, currentType);
    grid.innerHTML = "";

    if (!visibleListings.length) {
      grid.innerHTML = `
        <div class="empty-state">
          No listings match this filter yet. Send a shortlist request and Chiamaka will curate options for you.
        </div>
      `;
      return;
    }

    visibleListings.forEach((listing) => {
      grid.appendChild(renderListingCard(listing));
    });
  };

  cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentCity = button.dataset.filterValue;
      setActiveFilter(cityButtons, currentCity);
      render();
    });
  });

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentType = button.dataset.filterValue;
      setActiveFilter(typeButtons, currentType);
      render();
    });
  });

  panelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.inquiryTab;
      panelButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.inquiryPanel === panelName);
      });
    });
  });

  root.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const formType = form.dataset.inquiryForm;
      const data = Object.fromEntries(formData.entries());
      let message = "";

      if (formType === "fast") {
        if (!data.name || !data.phone || !data.need) {
          form.querySelector("[data-form-note]").textContent =
            "Please complete your name, phone number, and request.";
          return;
        }

        message = [
          "Hello Chiamaka, I would like a fast property enquiry.",
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `What I need: ${data.need}`
        ].join("\n");
      } else {
        if (!data.name || !data.phone || !data.city || !data.budget || !data.type) {
          form.querySelector("[data-form-note]").textContent =
            "Please complete the key shortlist fields before continuing.";
          return;
        }

        message = [
          "Hello Chiamaka, I would like you to curate a shortlist for me.",
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Preferred city: ${data.city}`,
          `Budget: ${data.budget}`,
          `Property type: ${data.type}`,
          data.bedrooms ? `Bedrooms: ${data.bedrooms}` : "",
          data.timeline ? `Timeline: ${data.timeline}` : ""
        ]
          .filter(Boolean)
          .join("\n");
      }

      window.open(buildWhatsAppLink(message), "_blank", "noopener");
      form.reset();
      form.querySelector("[data-form-note]").textContent =
        "WhatsApp is opening with your prefilled message.";
    });
  });

  fetch("assets/data/listings.json")
    .then((response) => response.json())
    .then((listings) => {
      allListings = listings;
      setActiveFilter(cityButtons, currentCity);
      setActiveFilter(typeButtons, currentType);
      render();
    })
    .catch((error) => {
      grid.innerHTML = `
        <div class="empty-state">
          Listings could not be loaded right now. Please use WhatsApp and Chiamaka will share current options directly.
        </div>
      `;
      console.error(error);
    });
}

if (typeof document !== "undefined") {
  initListingsPage();
}
