export const sectionIds = Object.freeze({
  home: "home",
  products: "products-page",
  features: "features-page",
  testimonials: "testimonials-page",
  gallery: "gallery-page",
  about: "about-page",
  contact: "contact-page",
});

export const sectionLinks = Object.freeze({
  home: `/#${sectionIds.home}`,
  products: "/products",
  features: `/#${sectionIds.features}`,
  testimonials: `/#${sectionIds.testimonials}`,
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
});

export const routeSectionIds = Object.freeze({
  "/": sectionIds.home,
  "/products": sectionIds.products,
  "/features": sectionIds.features,
  "/testimonials": sectionIds.testimonials,
  "/gallery": sectionIds.gallery,
  "/about": sectionIds.about,
  "/contact": sectionIds.contact,
});
