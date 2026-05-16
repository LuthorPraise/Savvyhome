import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();

const requiredFiles = [
  "index.html",
  "listings.html",
  "about.html",
  "services.html",
  "contact.html",
  "assets/data/site-images.js",
  "assets/images/logo/savvyhomes-logo.png",
  "assets/css/styles.css",
  "assets/js/main.js",
  "assets/js/listings.js",
  "assets/data/listings.json"
];

const filePath = (relativePath) => path.join(rootDir, relativePath);

test("creates the required static site files", () => {
  for (const relativePath of requiredFiles) {
    assert.equal(
      fs.existsSync(filePath(relativePath)),
      true,
      `${relativePath} should exist`
    );
  }
});

test("exposes shared WhatsApp helpers for the site shell", async () => {
  const moduleUrl = pathToFileURL(filePath("assets/js/main.js")).href;
  const { buildWhatsAppLink, getPageNameFromPath } = await import(moduleUrl);

  assert.equal(
    buildWhatsAppLink("Hello Savvy Homes", "2348183196861"),
    "https://wa.me/2348183196861?text=Hello%20Savvy%20Homes"
  );
  assert.equal(getPageNameFromPath("/services.html"), "Services");
});

test("filters listings and builds listing-specific WhatsApp copy", async () => {
  const moduleUrl = pathToFileURL(filePath("assets/js/listings.js")).href;
  const { filterListings, buildListingMessage } = await import(moduleUrl);

  const sampleListings = [
    { id: "a", city: "Lagos", type: "House", title: "Lekki Home" },
    { id: "b", city: "Abuja", type: "Land", title: "Maitama Plot" },
    { id: "c", city: "Lagos", type: "Land", title: "Epe Land" }
  ];

  assert.equal(filterListings(sampleListings, "Lagos", "all").length, 2);
  assert.equal(filterListings(sampleListings, "all", "Land").length, 2);
  assert.match(
    buildListingMessage({
      title: "Lekki Home",
      location: "Lekki Phase 1, Lagos",
      price: "NGN 85,000,000"
    }),
    /Lekki Home/
  );
});

test("provides listing data with complete card fields", async () => {
  const rawJson = fs.readFileSync(filePath("assets/data/listings.json"), "utf8");
  const listings = JSON.parse(rawJson);

  assert.ok(Array.isArray(listings), "Listings data should be an array");
  assert.ok(listings.length >= 6, "Listings data should contain at least 6 items");

  for (const listing of listings) {
    assert.ok(listing.image, "Listing image is required");
    assert.ok(listing.location, "Listing location is required");
    assert.ok(listing.price, "Listing price is required");
    assert.ok(listing.type, "Listing type is required");
    assert.ok(listing.alt, "Listing alt text is required");
  }
});

test("builds pages with accessible mobile navigation hooks", () => {
  const html = fs.readFileSync(filePath("index.html"), "utf8");

  assert.match(html, /data-menu-toggle/);
  assert.match(html, /data-mobile-nav/);
  assert.match(html, /aria-expanded=/);
  assert.match(html, /Chat on WhatsApp/i);
});

test("mobile navigation source includes overlay isolation safeguards", () => {
  const css = fs.readFileSync(filePath("assets/css/styles.css"), "utf8");
  const js = fs.readFileSync(filePath("assets/js/main.js"), "utf8");

  assert.match(
    css,
    /body\.nav-open[\s\S]*button-whatsapp/,
    "mobile menu open state should hide the header WhatsApp button"
  );
  assert.match(
    css,
    /\.mobile-nav-link[\s\S]*color:/,
    "mobile nav links should set an explicit visible color"
  );
  assert.match(
    js,
    /document\.body\.append\((backdrop,\s*menu|menu,\s*backdrop)\)/,
    "mobile nav layer should be moved outside the header stacking context"
  );
});

test("header WhatsApp CTA is desktop-only and not duplicated inside mobile overlays", () => {
  const pages = [
    "index.html",
    "listings.html",
    "about.html",
    "services.html",
    "contact.html"
  ];

  for (const page of pages) {
    const html = fs.readFileSync(filePath(page), "utf8");
    const headerMatch = html.match(/class="button button-whatsapp([^"]*)"/);

    assert.ok(headerMatch, `${page} should include a header WhatsApp button`);
    assert.match(
      headerMatch[1],
      /hidden\s+lg:inline-flex/,
      `${page} header WhatsApp button should be desktop-only`
    );

    const mobileNavMetaSection = html.match(
      /<div class="mobile-nav-meta">[\s\S]*?<\/div>/
    );

    assert.ok(mobileNavMetaSection, `${page} should include mobile nav meta content`);
    assert.doesNotMatch(
      mobileNavMetaSection[0],
      /data-whatsapp-message=/,
      `${page} mobile nav meta should not include a separate WhatsApp CTA`
    );
  }
});

test("homepage alone keeps the image-overlay hero treatment", () => {
  const homeHtml = fs.readFileSync(filePath("index.html"), "utf8");

  assert.match(
    homeHtml,
    /<section class="page-hero"/,
    "homepage should keep the page hero section"
  );
  assert.match(
    homeHtml,
    /class="hero-frame[\s"]/,
    "homepage should keep the hero image frame"
  );
  assert.match(
    homeHtml,
    /class="hero-overlay-panel/,
    "homepage hero should keep the image overlay copy"
  );
  assert.doesNotMatch(
    homeHtml,
    /hero-highlight-card|hero-floating-card/,
    "home hero should not keep floating corner content blocks"
  );

  const innerPages = [
    "about.html",
    "listings.html",
    "services.html",
    "contact.html"
  ];

  for (const page of innerPages) {
    const html = fs.readFileSync(filePath(page), "utf8");

    assert.match(
      html,
      /<section class="page-band"/,
      `${page} should use the non-overlay page band intro`
    );
    assert.doesNotMatch(
      html,
      /hero-overlay-panel|hero-frame-inner/,
      `${page} should not use the homepage overlay hero treatment`
    );
  }
});

test("homepage and about page include the refined content structure", () => {
  const homeHtml = fs.readFileSync(filePath("index.html"), "utf8");
  const aboutHtml = fs.readFileSync(filePath("about.html"), "utf8");

  assert.doesNotMatch(
    homeHtml,
    /hero-founder-note|hero-trustbar/,
    "homepage hero should not include founder-note or trustbar blocks"
  );
  assert.match(
    homeHtml,
    /class="section-link" href="listings\.html">View Listings/,
    "homepage featured listings should use the smaller section link"
  );
  assert.doesNotMatch(
    homeHtml,
    /<p class="section-copy">\s*Every service is designed/,
    "What We Do section should not keep the flexed section-copy block"
  );

  assert.match(
    aboutHtml,
    /class="story-layout about-story-layout"/,
    "about story should use the side-by-side story layout"
  );
  assert.match(
    aboutHtml,
    /Founder portrait for the Savvy Homes story section/,
    "about story should include the founder image"
  );
});

test("footers include a shared social icon row", () => {
  const pages = [
    "index.html",
    "listings.html",
    "about.html",
    "services.html",
    "contact.html"
  ];

  for (const page of pages) {
    const html = fs.readFileSync(filePath(page), "utf8");

    assert.match(html, /class="footer-socials"/, `${page} should include footer social links`);
    assert.match(html, /aria-label="Instagram"/, `${page} should include Instagram icon link`);
    assert.match(html, /aria-label="Twitter"/, `${page} should include Twitter icon link`);
    assert.match(html, /aria-label="YouTube"/, `${page} should include YouTube icon link`);
  }
});

test("all pages use the shared PNG logo in headers and footers", () => {
  const pages = [
    "index.html",
    "listings.html",
    "about.html",
    "services.html",
    "contact.html"
  ];

  for (const page of pages) {
    const html = fs.readFileSync(filePath(page), "utf8");
    const logoMatches = html.match(/assets\/images\/logo\/savvyhomes-logo\.png/g) || [];

    assert.ok(
      logoMatches.length >= 3,
      `${page} should use the shared logo in the desktop header, mobile nav, and footer`
    );
    assert.doesNotMatch(
      html,
      /<span class="brand-name">|<span class="brand-subtitle">/,
      `${page} should not keep the old text-based brand mark`
    );
    assert.match(
      html,
      /alt="Savvy Homes Logo"/,
      `${page} should use the required logo alt text`
    );
  }
});

test("major non-listing images are centralized through site-images", async () => {
  const siteImagesUrl = pathToFileURL(filePath("assets/data/site-images.js")).href;
  const { SITE_IMAGES } = await import(siteImagesUrl);
  const mainJs = fs.readFileSync(filePath("assets/js/main.js"), "utf8");

  assert.ok(SITE_IMAGES.homeHero, "site-images should expose the homepage hero image");
  assert.ok(SITE_IMAGES.homeFounder, "site-images should expose the homepage founder image");
  assert.ok(SITE_IMAGES.aboutFounderIntro, "site-images should expose the About intro founder image");
  assert.ok(SITE_IMAGES.aboutFounderStory, "site-images should expose the About story founder image");
  assert.ok(SITE_IMAGES.contactCoverage, "site-images should expose the contact coverage image");
  assert.match(
    mainJs,
    /from "\.\/\.\.\/data\/site-images\.js"|from "\.\.\/data\/site-images\.js"|from "\.\/site-images\.js"|from "\.\/\.\.\/data\/site-images\.js"/,
    "main.js should import the centralized site image config"
  );
  assert.match(
    mainJs,
    /data-site-image/,
    "main.js should hydrate major images from data-site-image hooks"
  );

  const pages = ["index.html", "about.html", "services.html", "contact.html"];

  for (const page of pages) {
    const html = fs.readFileSync(filePath(page), "utf8");

    assert.doesNotMatch(
      html,
      /https:\/\/coresg-normal\.trae\.ai\/api\/ide\/v1\/text_to_image/,
      `${page} should not keep hardcoded generated-image URLs in markup`
    );
  }
});

test("footer social rows include Facebook with the existing icon set", () => {
  const pages = [
    "index.html",
    "listings.html",
    "about.html",
    "services.html",
    "contact.html"
  ];

  for (const page of pages) {
    const html = fs.readFileSync(filePath(page), "utf8");
    assert.match(html, /aria-label="Facebook"/, `${page} should include a Facebook icon link`);
  }
});
