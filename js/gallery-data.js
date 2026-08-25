/* ==========================================================================
   Hamilton Kitchens — Gallery photos
   Add a photo: drop the file (1600px wide) and an -800 version in /images/gallery/
   then add one object below. Categories: "kitchens", "bathrooms", "wood-mode", "before-after"
   A photo may belong to several categories. `wide` makes it span two columns on desktop.
   Alt text: describe the room and include the town when known.
   ========================================================================== */
window.GALLERY_PHOTOS = [
  /* Showroom photos supplied by the client (real) */
  { src: "showroom/showroom-cherry-island-display", categories: ["kitchens"], wide: true,
    alt: "Cherry cabinetry kitchen display with a large island and three upholstered stools, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Cherry island display — Hamilton Kitchens showroom, Hamilton, NJ" },
  { src: "showroom/showroom-white-shaker-display", categories: ["kitchens"],
    alt: "White Shaker kitchen display with dark quartz countertop and stainless appliances, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "White Shaker with dark quartz — showroom display" },
  { src: "showroom/showroom-cherry-and-white-kitchen", categories: ["kitchens"],
    alt: "Two-tone cherry and white kitchen display with island seating, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Two-tone cherry and white — showroom display" },
  { src: "showroom/showroom-cherry-island-marble-top", categories: ["kitchens"],
    alt: "Cherry kitchen island with marble-look countertop and upholstered stools, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Cherry island, marble-look top — showroom display" },
  { src: "showroom/showroom-white-cabinetry-sink-run", categories: ["kitchens"],
    alt: "White kitchen cabinetry sink run with glass-front upper cabinets, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Glass-front uppers — showroom display" },
  { src: "showroom/showroom-cream-kitchen-navy-island", categories: ["kitchens"], wide: true,
    alt: "Cream kitchen cabinetry with herringbone tile backsplash and navy island, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Cream cabinetry with navy island — showroom display" },
  { src: "showroom/showroom-cream-cabinetry-range-hood", categories: ["kitchens"],
    alt: "Cream kitchen cabinetry with wood range hood and herringbone backsplash, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Cream cabinetry, wood hood — showroom display" },
  { src: "showroom/showroom-cream-cabinetry-floating-shelves", categories: ["kitchens"],
    alt: "Cream kitchen cabinetry with floating wood shelves and quartz countertop, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Floating shelves — showroom display" },
  { src: "showroom/showroom-cream-kitchen-door-samples", categories: ["kitchens"],
    alt: "Cream kitchen display with cabinet door sample wall, Hamilton Kitchens showroom, Hamilton NJ",
    caption: "Door sample wall — showroom display" },

  /* Bathroom remodels (client photos) */
  { src: "gallery/bathroom-white-subway-walk-in-shower", categories: ["bathrooms"],
    alt: "Walk-in shower with white subway tile and frameless glass beside a floating vanity with black fixtures, bathroom remodel by Hamilton Kitchens" },
  { src: "gallery/bathroom-walk-in-shower-marble-vanity", categories: ["bathrooms"],
    alt: "White subway-tile walk-in shower with a gray vanity, marble-look countertop, and arched mirror, bathroom remodel by Hamilton Kitchens" },
  { src: "gallery/bathroom-freestanding-tub-modern", categories: ["bathrooms"],
    alt: "Modern bathroom with a freestanding soaking tub, dark stone tile, and twin wall-mounted sinks, bathroom remodel by Hamilton Kitchens" },
  { src: "gallery/bathroom-soaking-tub-floating-vanity", categories: ["bathrooms"],
    alt: "Luxury bathroom with a freestanding soaking tub and a floating stone vanity in warm neutral tones, bathroom remodel by Hamilton Kitchens" },
  { src: "gallery/bathroom-freestanding-tub-spa", categories: ["bathrooms"],
    alt: "Spa-style bathroom with a freestanding tub, wood paneling, and a slatted screen with greenery, bathroom remodel by Hamilton Kitchens" },
  { src: "gallery/bathroom-corner-glass-shower", categories: ["bathrooms"],
    alt: "Bathroom with a curved corner glass shower, wall-mounted basin, and heated towel rail, bathroom remodel by Hamilton Kitchens" },

  /* PLACEHOLDERS — replace with real project photos. */
  { src: "gallery/placeholder-wood-mode-kitchen-princeton-nj", categories: ["kitchens", "wood-mode"],
    alt: "[Wood-Mode kitchen placeholder — describe style, features and town]",
    caption: "[Project Name — Town, NJ] [Wood-Mode cabinetry, countertops, island, hood.]" },
  { src: "gallery/placeholder-before-after-kitchen-lawrenceville-nj", categories: ["kitchens", "before-after"],
    alt: "[Before and after placeholder — describe the transformation and town]",
    caption: "[Project Name — Town, NJ] [Before & after: what changed.]" }
];
