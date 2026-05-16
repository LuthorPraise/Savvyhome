# Savvy Homes Design Specification

## Project Summary

Savvy Homes is a 5-page static marketing website for a Nigerian real estate brand with a strong personal-brand presence. The site uses the approved **Premium Personal Brand Hybrid** direction: premium, editorial, cinematic, image-led, conversion-focused, and mobile-first. The provided mid-fidelity HTML blueprint remains the structural guide, but not the final visual system or responsive behavior.

The final implementation uses HTML, Tailwind CSS, and vanilla JavaScript. It must feel elegant and modern without becoming overly flashy, corporate, or dark-heavy. WhatsApp is the primary conversion channel throughout the site.

## Goals

1. Build a fully responsive 5-page static site for `Home`, `Listings`, `About`, `Services`, and `Contact`.
2. Preserve the blueprint's section order and content intent while elevating spacing, typography, motion, and usability.
3. Make mobile interaction quality a first-class concern, especially navigation behavior, overlay handling, scroll locking, spacing, and overflow prevention.
4. Create a premium Nigerian real estate feel that is warm, trustworthy, personal, and image-led.
5. Support strong conversion through consistent WhatsApp-first CTAs and a friction-light inquiry flow.
6. Load listings dynamically from a JSON file on the Listings page.
7. Meet practical accessibility, SEO, and performance expectations for a modern brochure site.

## Non-Goals

1. No CMS or backend.
2. No authentication, dashboard, or property booking flow.
3. No complex search engine or map integration.
4. No heavy animation framework.
5. No dark, boxed, or overly brokerage-like UI treatment.

## Audience

Primary audiences:

- Buyers and investors looking for homes or land in Lagos and Abuja.
- Prospects who prefer direct trust-based contact rather than a large listing portal experience.
- Users arriving from social media, referrals, WhatsApp, or personal-brand discovery.

User expectations:

- Immediate trust and professionalism.
- Clear understanding of services and locations served.
- Fast access to available listings.
- Frictionless direct conversation through WhatsApp.
- Smooth mobile browsing on small screens.

## Brand Direction

Core brand traits:

- Elegant
- Trustworthy
- Nigerian-rooted
- Personal-brand-led
- Spacious
- Warmly premium
- Editorial rather than corporate
- Confident but not loud
- Emotionally immersive
- Memorable without excess

Emotional target:

- "This feels polished, high-value, and personal."
- "I can trust this brand and reach the founder directly."
- "The experience feels premium without trying too hard."
- "This feels warm, alive, and emotionally distinctive."
- "This does not feel like a generic premium template."

## Visual System

### Color Palette

- Primary Orange: `#F5920A`
- Accent Gold: `#D97B00`
- Deep Black: `#0A0A0A`
- Off-White: `#F7F3EE`
- Charcoal: `#1A1A1A`

### Color Usage Rules

- Orange is a primary visual force, not a tiny accent. It should appear in CTAs, hover states, selective section backgrounds, dividers, badges, ticker bands, underline moments, and motion highlights.
- Off-white and warm neutrals should carry a significant portion of the page canvas to avoid the site feeling too dark.
- Deep black and charcoal should ground the experience in headers, footer, overlays, selected sections, and typography contrast.
- Gold is used sparingly to enrich premium details, not compete with orange.
- Avoid large uninterrupted fields of dark color stacked repeatedly on mobile.

### Typography

Recommended direction:

- Headings: elegant serif with editorial personality.
- Body: clean sans-serif for clarity and modern readability.

Typography behavior:

- Strong contrast between display headings and practical body text.
- Large, airy heading scale on desktop with controlled but still premium scale on mobile.
- Short line lengths for long-form copy.
- Spacious vertical rhythm to reduce visual density.

### Imagery

Image strategy:

- Image-led layouts with strong hero photography, founder portrait usage, property imagery, and supporting service visuals.
- Images should feel warm, premium, aspirational, and locally relevant to Nigerian real estate.
- Use rounded corners selectively and avoid over-framing every image in heavy cards.
- Apply light tint overlays or gradient fades only when they improve contrast or cinematic mood.
- Favor image compositions with depth, foreground-background separation, human presence, and a lived-in aspirational quality over flat catalog-like imagery.

Image behavior:

- All content images include descriptive `alt` text.
- Use lazy loading below the fold.
- Avoid decorative image overload that slows the page.

## Experience Principles

1. **Mobile-first by default**
   Every layout, spacing, and interaction starts from `320px` and scales upward.
2. **Editorial, not box-heavy**
   Use whitespace, rhythm, and typography for structure before using cards.
3. **Cinematic, not flashy**
   Motion is smooth, restrained, and meaningful.
4. **Direct conversion**
   WhatsApp stays consistently accessible without repeating the same CTA everywhere.
5. **Personal trust**
   The founder presence should feel authentic and central, not secondary.
6. **Readable on the move**
   Small-screen text, buttons, and images remain easy to scan and tap.
7. **Warm emotional atmosphere**
   The experience should feel immersive and human, not like a polished but generic brochure.

## Information Architecture

Primary pages:

1. Home
2. Listings
3. About
4. Services
5. Contact

Global elements:

- Sticky responsive header
- Mobile navigation overlay
- Persistent primary WhatsApp CTA
- Footer with navigation, services, contact, and trust details

## Global Layout Rules

### Container Behavior

- Use a narrow-to-medium content container for text-led sections.
- Use wider containers for hero, listings, featured imagery, and testimonial areas.
- Maintain generous horizontal padding on mobile without causing overflow.
- Default to one-column stacks on smaller screens.

### Section Spacing

- Large top and bottom spacing to create breathing room.
- Tighter internal spacing for utility sections like filters or stats.
- Avoid sections that feel compressed or card-stacked.

### Grid Behavior

- Mobile: single-column baseline.
- Small tablets: two-column where content density benefits from it.
- Desktop: preserve split-layout intent from blueprint using balanced ratios.

### Overflow Prevention

- No horizontal scroll at `320px`, `375px`, `414px`, or `768px`.
- All media, grids, overlays, and animated regions must clip safely.
- The body and root containers must prevent accidental `100vw` overflow patterns.

## Navigation Specification

### Desktop Navigation

Structure:

- Left: brand mark or wordmark.
- Center/right: page links.
- Far right: primary WhatsApp CTA.

Behavior:

- Sticky at the top with subtle background transition on scroll.
- Shrinks slightly after scroll to reduce visual weight.
- Maintains high contrast and strong CTA visibility.

### Mobile Navigation

This is a critical implementation area and should be treated as a rebuilt component, not an adaptation of the blueprint.

Structure:

- Compact sticky header with brand, WhatsApp shortcut, and menu toggle.
- Full overlay panel opens from the top or right with clear close control.

Required behavior:

- Opening the menu locks background scrolling.
- The overlay is fully opaque enough to visually separate itself from the page beneath.
- Underlying content must not scroll while the menu is open.
- The page must not shift horizontally when the menu opens or closes.
- Close on tap of close button, overlay dismissal area if used, or link selection.
- Restore scroll behavior cleanly on close.
- Preserve focus order and keyboard accessibility.

Animation:

- Use a short, polished transition for panel reveal.
- Fade the backdrop while sliding or revealing the panel.
- Avoid laggy or springy motion.

Failure cases to prevent:

- Transparent or semi-broken overlay state.
- Horizontal scroll caused by translated panels.
- Body continuing to scroll underneath the menu.
- Menu remaining logically open after route navigation.
- Z-index issues with hero images or sticky content appearing above the menu.

## Motion System

Motion should make the site feel alive and premium, not flashy or over-animated.

Allowed motion patterns:

- Fade-up content reveals on scroll
- Gentle image zoom or pan on hover
- Button hover lifts or glow shifts
- Link underline or color transitions
- Testimonial carousel movement
- Ticker strip movement
- Navigation state transitions
- Soft stagger timing for grouped text or cards
- Ambient image drift or gradient movement in hero-adjacent moments where performance remains strong

Motion rules:

- Keep durations short to medium and consistent.
- Prefer opacity, transform, and color transitions.
- Avoid excessive parallax, spinning, bouncing, or layered effects.
- Respect `prefers-reduced-motion`.
- Use reveal timing to create calm emotional pacing rather than purely functional entrance effects.
- Motion should feel like living energy in the interface, not decoration.

## Founder Presence Strategy

Chiamaka should feel like a recurring trust anchor across the site rather than a single isolated founder block.

Implementation guidance:

- Reference the founder voice or presence in multiple pages, not only the About page.
- Use short recurring trust touchpoints such as founder-led captions, signature-style microcopy, or direct WhatsApp framing.
- Keep these touches subtle and human so the site stays premium rather than self-promotional.
- Ensure the brand consistently feels like personal guidance from a trusted expert, not an anonymous brokerage.

## Page Specifications

### 1. Home

The Home page preserves the blueprint order while improving readability, imagery, and conversion flow.

#### Header / Navigation

- Sticky global navigation.
- WhatsApp CTA visible.
- Mobile overlay behavior follows the global navigation spec.

#### Hero

Blueprint intent:

- Split layout with text on one side and image on the other.

Final treatment:

- Keep copy free-floating rather than trapped in a heavy card.
- Use a strong, elegant headline with a concise value proposition.
- Pair with a premium property or lifestyle image.
- Include two primary actions: view listings and view services.
- Present trust details like years, coverage, or registration subtly inline.
- Increase emotional distinctiveness through stronger image composition, more generous spacing, layered depth, and a more deliberate typography rhythm.
- Use selective layering such as soft gradients, an offset image frame, or atmospheric light-shadow separation to make the hero feel memorable without clutter.
- Consider a subtle founder-linked trust note near the hero copy so the personal-brand presence begins early in the experience.

Mobile behavior:

- Stack text first, image second.
- Preserve visual impact without making the hero too tall.
- Ensure CTA tap targets are large and spaced.
- Keep layered hero treatments lightweight on small screens so they remain elegant and do not introduce overflow or visual noise.

#### Moving Trust Strip

- Use an orange-dominant marquee-style strip.
- Surface services, locations, trust notes, and registration details.
- Keep animation smooth and lightweight.
- Avoid clipping or overflow on smaller screens.

#### Services Overview

- Introduce three core service areas from the blueprint.
- Use light visual cards or structured columns, but keep the section airy.
- Make each service clearly tappable with a learn-more cue.

#### Stats Strip

- Use refined counters or static animated-on-view numerals.
- Present proof points cleanly.
- Ensure stats wrap gracefully on mobile into two-per-row or stacked layout.

#### Featured Listings

- Display a curated subset of listings from the JSON source.
- Cards show image, type, location, price, and WhatsApp inquiry button.
- Use strong imagery and reduce text clutter.

#### Founder Strip

- Spotlight Chiamaka Sonia as the personal face of the brand.
- Include portrait, short narrative, and link to About or direct WhatsApp.
- This section should feel warm and human, not promotional.
- The founder strip should feel like a continuation of the site's emotional center, not a detached biography block.
- Use copy and art direction that reinforces calm expertise, personal care, and guidance.

#### Testimonials

- Convert the blueprint's testimonial logic into a refined carousel.
- One testimonial visible at a time on mobile.
- Include touch-friendly controls and clear indicators.
- Auto-advance should pause or remain stable when the user interacts.
- Write testimonials as short human stories with context, emotional payoff, and a sense of lived experience rather than generic praise lines.
- Prioritize testimonials that reveal trust, clarity, reassurance, and the founder's personal guidance.

#### Closing CTA

- One focused end-of-page WhatsApp conversion band.
- Clear message and strong visual hierarchy.
- Orange-forward styling encouraged here.

#### Footer

- Brand, links, services, contact, and trust details.
- Use a visually grounded but not overly heavy footer.
- Ensure strong readability and good spacing on mobile.

### 2. Listings

The Listings page balances browsing with direct inquiry.

#### Header Band

- Slim but premium page intro.
- Include heading, short supporting line, and optional breadcrumb.

#### Filter Area

- Client-side filters powered by JSON data.
- Minimum useful filters: city, property type, and all.
- Filters should be clear pill buttons or tabs, touch-friendly, and keyboard-accessible.

#### Listings Grid

Data source:

- Load listings from a local JSON file.

Each listing includes:

- Image
- Title
- Location
- Price
- Type
- WhatsApp CTA

Rendering behavior:

- Populate cards dynamically with vanilla JavaScript.
- Support filtered re-render without jank.
- Provide friendly empty-state messaging when no listing matches.

Card behavior:

- Use image-led cards with strong visual hierarchy.
- CTA opens WhatsApp with a prefilled property-specific message.
- Cards should not become text-dense.

#### Inquiry / Shortlist Section

Preserve the blueprint intent of fast inquiry and shortlist request.

Implementation:

- Use tabs or segmented controls to switch between `Fast Inquiry` and `Request a Shortlist`.
- Both paths generate prefilled WhatsApp messages.
- Fast Inquiry asks for minimal data.
- Shortlist Request asks for city, budget, type, bedroom need, and timeline.

Mobile behavior:

- Tabs must be easy to tap and not overflow.
- Forms must stack cleanly and remain readable.

### 3. About

This is the core trust-building page.

#### About Hero

- Split image and narrative layout.
- Introduce the brand's philosophy, operating regions, and personal-service value.
- Carry emotional warmth here with portrait-led imagery, elegant rhythm, and a sense that the visitor is meeting the person behind the brand.

#### Founder Narrative

- Longer-form editorial story about Chiamaka.
- Use paragraph spacing, pull-quote styling, or subtle dividers rather than heavy cards.
- Keep a direct WhatsApp route available but not overly repeated.
- This section should deepen the personal-brand relationship and make the founder feel emotionally central to the full site experience.

#### Why Choose Us

- Present key trust points in a clean structured grid.
- Use short, credible statements rather than marketing fluff.

#### Stats

- Reuse proof numbers consistently with the Home page.

#### Closing CTA

- Direct users toward Listings or WhatsApp conversation.
- Keep it calm, warm, and premium.

### 4. Services

This page expands the blueprint's service layout into a polished editorial service presentation.

#### Services Header

- Short introduction with a premium visual tone.
- Frame services as part of a guided experience and property journey, not only a list of offerings.

#### Service Sections

Core service groups:

- Property Sales
- Land Sales
- Consultation
- Inspection

Layout:

- Alternate image/text alignment across sections on larger screens.
- Stack naturally on mobile.
- Include concise service explanation and what is included.
- Each major service ends with a WhatsApp-led CTA.
- Support each service with visual storytelling that suggests aspiration, ease, and confidence in the process.

Style:

- Use selective surface treatment, icons, or light separators rather than boxing each paragraph.
- Keep sections spacious and image-led.
- Make the page feel experiential through imagery, pacing, microcopy, and emotional framing so it does not read like a corporate service sheet.

#### Services CTA

- Final guidance CTA for users unsure which service they need.
- Encourage direct conversation.

### 5. Contact

The Contact page is a friction-light lead capture and direct connection page.

#### Contact Header

- Simple and reassuring intro.

#### Contact Core

Content:

- Name
- Phone
- Optional email
- Enquiry type
- Message

Behavior:

- Form submission builds a WhatsApp message and opens WhatsApp.
- Include clear validation for required fields.
- Keep the form simple, clean, and not over-styled.

Direct contact block:

- Phone
- Instagram handle
- Coverage areas
- Direct WhatsApp action

#### Coverage Area

- Present Lagos and Abuja as key regions served.
- Could be visual cards, editorial blocks, or image-backed summaries.

## Content Direction

Voice and tone:

- Elegant
- Clear
- Warm
- Confident
- Personal
- Nigerian-rooted
- Conversion-aware without sounding pushy

Copy rules:

- Avoid generic global real-estate jargon.
- Prefer grounded, trust-based language.
- Keep CTAs direct and human.
- Let the founder voice and local credibility come through naturally.

Example tone cues:

- "Find a home that matches your next chapter."
- "Direct guidance for buying property in Lagos and Abuja."
- "Talk to Chiamaka on WhatsApp."
- "A calmer, more personal way to buy property."
- "Guidance that feels direct, thoughtful, and trusted."

## Component Rules

### Buttons

Types:

- Primary orange buttons
- Secondary ghost buttons
- WhatsApp buttons

Requirements:

- Large enough for mobile tap targets.
- Strong visible hover and focus states.
- Consistent rounded shape and padding.

### Cards

Use cards only where structure benefits from them:

- Property listings
- Testimonials
- Selected service summaries
- Value points where helpful

Avoid placing all text blocks inside cards.

### Forms

- Clear labels above fields or tightly associated with fields.
- Accessible focus states.
- Helpful placeholder text, but placeholders are not labels.
- Inputs and textareas must remain comfortable on small screens.

### Links

- Underline or color change on hover and focus.
- Clear active page state in navigation.

## Accessibility Requirements

1. Use semantic HTML landmarks: `header`, `nav`, `main`, `section`, `footer`.
2. Preserve heading hierarchy with one `h1` per page.
3. Add descriptive `alt` text to meaningful images.
4. Mark decorative imagery appropriately.
5. Ensure keyboard access for nav, filters, carousel controls, and form interactions.
6. Provide visible focus states on links, buttons, and form controls.
7. Use ARIA only where native semantics are insufficient.
8. Ensure sufficient contrast, especially for orange text and lighter overlays.
9. Respect reduced motion preferences.
10. Ensure the mobile menu announces open and close state where appropriate.

## SEO Requirements

Each page should include:

- Unique `title`
- Unique `meta description`
- Canonical-ready structure if later needed
- Open Graph title and description basics
- Clear heading hierarchy
- Descriptive internal links
- Descriptive image alt text

Suggested SEO framing:

- Home: premium real estate in Lagos and Abuja
- Listings: property listings and land opportunities
- About: founder story and trust credibility
- Services: property sales, land, consultation, inspection
- Contact: direct contact for property inquiries

## Performance Requirements

1. Use Tailwind via CDN or lightweight configuration appropriate for a static deliverable.
2. Keep JavaScript small and purposeful.
3. Lazy load below-the-fold images.
4. Avoid large animation libraries.
5. Prefer CSS transitions and small vanilla JS modules.
6. Keep the JSON listing source lightweight.
7. Reuse layout and script patterns across pages where possible.
8. Avoid layout shift from image loading by setting dimensions or aspect-ratio behavior.

## Technical Structure

Suggested project structure:

- `index.html`
- `listings.html`
- `about.html`
- `services.html`
- `contact.html`
- `assets/js/main.js`
- `assets/js/listings.js`
- `assets/data/listings.json`
- `assets/css/` only if small custom CSS beyond Tailwind utilities is needed

Shared JavaScript responsibilities:

- Mobile menu open and close behavior
- Body scroll lock utility
- Active nav state
- Smooth reveal behavior
- WhatsApp message builders
- Testimonial carousel

Listings-specific JavaScript:

- Fetch and render JSON
- Filter handling
- Empty states

## Content and Asset Needs

Implementation should include:

- Premium placeholder copy aligned to approved tone
- Realistic sample listing data in JSON
- Relevant property and lifestyle imagery
- Founder imagery placeholder if no final asset exists
- Icons only where they improve clarity, not as decoration overload

## Testing and Verification Checklist

Critical viewport checks:

- `320px`
- `375px`
- `414px`
- `768px`

Verify:

1. No horizontal overflow on any page.
2. Mobile menu opens cleanly and closes fully.
3. Background scroll locks when mobile menu is open.
4. Overlay opacity and z-index fully cover the page state.
5. Hero and image sections remain balanced and readable on small screens.
6. Buttons and links are sized well for touch.
7. JSON listings load correctly and filters work.
8. WhatsApp CTAs generate the correct prefilled links.
9. Testimonial controls and any tabs work with keyboard and touch.
10. Reduced-motion handling does not break layout or usability.

## Risks and Preventive Decisions

### Risk: Site becomes too dark

Prevention:

- Use off-white and warm neutral backgrounds more often than stacked dark panels.
- Reserve dark backgrounds for framing moments.

### Risk: Site becomes too boxed

Prevention:

- Structure with spacing, typography, and imagery first.
- Use cards only for functional grouping.

### Risk: Orange feels too weak

Prevention:

- Use orange in larger visual surfaces, CTA backgrounds, ticker bands, accent rules, and interaction states.

### Risk: Motion becomes distracting

Prevention:

- Keep all animation subtle, short, and purposeful.
- Favor consistency over variety.
- Avoid chasing spectacle; the goal is emotional presence and polish.

### Risk: Mobile navigation breaks

Prevention:

- Build mobile nav as a dedicated component with explicit scroll lock and overlay logic.
- Test against small widths early.

### Risk: Listings page feels disconnected from the premium brand

Prevention:

- Use strong imagery, warm spacing, and carefully styled filters rather than generic portal UI.

### Risk: Experience feels too generic

Prevention:

- Use more distinctive hero composition, founder-led continuity, human testimonials, and service storytelling.
- Let emotional warmth show through rhythm, copy, and imagery instead of adding flashy visual effects.

## Implementation Readiness

This specification is ready to guide the implementation plan.

The first implementation priority should be the shared responsive shell:

1. Global layout and typography system
2. Header and mobile navigation
3. Shared CTA patterns
4. Shared motion and reveal behavior
5. Listings JSON system

## Constraints and Notes

- The reference mid-fidelity layout is a blueprint for content structure and section order, not the final interaction model.
- The original blueprint's sidebar/workspace presentation is not part of the final site.
- The mobile navigation must be rebuilt from scratch to satisfy the responsiveness and overlay requirements.
- Because the current project folder is not a Git repository, this design document cannot be committed at this stage.
