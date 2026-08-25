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

  /* PLACEHOLDERS — replace with real project photos. Caption template: "[Project Name — Town, NJ] One or two sentences: style, key features, materials." */
  { src: "gallery/placeholder-bathroom-remodel-hamilton-nj", categories: ["bathrooms"],
    alt: "[Bathroom remodel placeholder — describe style, features and town, e.g. Walk-in shower with frameless glass and double vanity, Hamilton NJ]",
    caption: "[Project Name — Town, NJ] [Style, key features, notable materials.]" },
  { src: "gallery/placeholder-bathroom-remodel-robbinsville-nj", categories: ["bathrooms"],
    alt: "[Bathroom remodel placeholder — describe style, features and town]",
    caption: "[Project Name — Town, NJ] [Style, key features, notable materials.]" },
  { src: "gallery/placeholder-wood-mode-kitchen-princeton-nj", categories: ["kitchens", "wood-mode"],
    alt: "[Wood-Mode kitchen placeholder — describe style, features and town]",
    caption: "[Project Name — Town, NJ] [Wood-Mode cabinetry, countertops, island, hood.]" },
  { src: "gallery/placeholder-before-after-kitchen-lawrenceville-nj", categories: ["kitchens", "before-after"],
    alt: "[Before and after placeholder — describe the transformation and town]",
    caption: "[Project Name — Town, NJ] [Before & after: what changed.]" }
];
