const products = [
  {
    id: 1,
    name: "Sliding Window",
    images: [
      "/assets/1-Sliding Window/1.1.png",
      "/assets/1-Sliding Window/1.2.png",
      "/assets/1-Sliding Window/1.3.jpg",
      "/assets/1-Sliding Window/1.4.webp"
    ],
    category: "window",
    price: "₹15,000",
    description: "Modern aluminium sliding window with smooth gliding mechanism. Perfect for balconies and living rooms with beautiful views. Features double track system, weather stripping, and premium quality rollers for effortless operation.",
    features: ["Smooth gliding mechanism", "Double track system", "Weather stripping", "Premium quality rollers", "Mosquito mesh included"],
    sizes: ["4ft x 4ft", "5ft x 4ft", "6ft x 5ft", "Custom sizes available"],
    colors: ["White", "Brown", "Black", "Grey", "Wooden finish"]
  },
  {
    id: 2,
    name: "Casement Window",
    images: [
      "/assets/2-Casement Window/2.1.png",
      "/assets/2-Casement Window/2.2.png",
      "/assets/2-Casement Window/2.3.webp",
      "/assets/2-Casement Window/2.4.avif"
    ],
    category: "window",
    price: "₹18,000",
    description: "Premium casement window with strong aluminium frame. Opens outward like a door providing maximum ventilation and unobstructed views. Features multi-point locking system for security.",
    features: ["Outward opening design", "Multi-point locking", "Maximum ventilation", "Unobstructed views", "Weather resistant"],
    sizes: ["3ft x 4ft", "4ft x 4ft", "4ft x 5ft", "Custom sizes available"],
    colors: ["White", "Black", "Brown", "Grey", "Bronze"]
  },
  {
    id: 3,
    name: "Fixed Window",
    images: [
      "/assets/3-Fixed Window/3.1.png",
      "/assets/3-Fixed Window/3.2.png",
      "/assets/3-Fixed Window/3.3.webp",
      "/assets/3-Fixed Window/3.4.jpg"
    ],
    category: "window",
    price: "₹12,000",
    description: "Elegant fixed window design for areas requiring unobstructed views and natural light. Perfect for storefronts, offices, and modern homes. Features high-quality glass with excellent thermal insulation.",
    features: ["Maximum glass area", "Excellent thermal insulation", "Noise reduction", "Low maintenance", "Modern aesthetic"],
    sizes: ["4ft x 3ft", "5ft x 4ft", "6ft x 4ft", "Custom sizes available"],
    colors: ["Clear", "Tinted", "Frosted", "Reflective"]
  },
  {
    id: 4,
    name: "Bay Window",
    images: [
      "/assets/4-Bay Window/4.1.png",
      "/assets/4-Bay Window/4.2.png",
      "/assets/4-Bay Window/4.3.jpg",
      "/assets/4-Bay Window/4.4.jpg"
    ],
    category: "window",
    price: "₹45,000",
    description: "Stunning bay window that adds architectural beauty to any home. Creates additional interior space with panoramic views. Perfect for living rooms and bedrooms.",
    features: ["Panoramic views", "Creates extra space", "Natural light maximization", "Architectural beauty", "Ventilation options"],
    sizes: ["6ft x 3ft", "8ft x 3ft", "10ft x 3ft", "Custom sizes available"],
    colors: ["White", "Wooden finish", "Black", "Grey"]
  },
  {
    id: 5,
    name: "Corner Window",
    images: [
      "/assets/5-Corner Window/5.1.png",
      "/assets/5-Corner Window/5.2.jpg",
      "/assets/5-Corner Window/5.3.webp",
      "/assets/5-Corner Window/5.4.jpg"
    ],
    category: "window",
    price: "₹35,000",
    description: "Innovative corner window system for modern architecture. Provides uninterrupted corner views with seamless glass transitions. Creates a stunning visual impact.",
    features: ["Corner-to-corner views", "Seamless glass transition", "Modern design", "Maximum light", "Structural strength"],
    sizes: ["4ft x 4ft", "5ft x 5ft", "Custom sizes available"],
    colors: ["Clear", "Tinted", "Low-E glass"]
  },
  {
    id: 6,
    name: "Louvered Window",
    images: [
      "/assets/6-Louvered Window/6.1.png",
      "/assets/6-Louvered Window/6.2.jpg",
      "/assets/6-Louvered Window/6.3.jpg",
      "/assets/6-Louvered Window/6.4.jpg"
    ],
    category: "window",
    price: "₹22,000",
    description: "Classic louvered window design for excellent ventilation control. Perfect for humid areas like bathrooms, kitchens, and utility rooms. Features adjustable blades.",
    features: ["Adjustable ventilation", "Privacy control", "Air circulation", "Classic design", "Moisture resistant"],
    sizes: ["3ft x 3ft", "4ft x 4ft", "3ft x 5ft", "Custom sizes available"],
    colors: ["White", "Brown", "Grey", "Black"]
  },
  {
    id: 7,
    name: "Tilt & Turn Window",
    images: [
      "/assets/7-Tilt & Turn Window/7.1.png",
      "/assets/7-Tilt & Turn Window/7.2.jpg",
      "/assets/7-Tilt & Turn Window/7.3.avif",
      "/assets/7-Tilt & Turn Window/7.4.webp"
    ],
    category: "window",
    price: "₹25,000",
    description: "Versatile tilt and turn window offering two opening modes. Tilts from top for ventilation or turns like a door for easy cleaning. European technology for superior performance.",
    features: ["Dual opening mode", "Top tilt ventilation", "Side turn opening", "Easy cleaning", "Superior sealing"],
    sizes: ["4ft x 4ft", "5ft x 4ft", "4ft x 5ft", "Custom sizes available"],
    colors: ["White", "Grey", "Black", "Brown", "Wooden finish"]
  },
  {
    id: 8,
    name: "Skylight Window",
    images: [
      "/assets/8-Skylight Window/8.1.png",
      "/assets/8-Skylight Window/8.2.jpg",
      "/assets/8-Skylight Window/8.3.jpg",
      "/assets/8-Skylight Window/8.4.jpg"
    ],
    category: "window",
    price: "₹30,000",
    description: "Premium skylight window for roof installations. Brings abundant natural light into dark spaces. Features remote control operation and rain sensors.",
    features: ["Roof installation", "Natural light", "Remote control", "Rain sensor", "Energy efficient"],
    sizes: ["2ft x 2ft", "3ft x 3ft", "4ft x 4ft", "Custom sizes available"],
    colors: ["Clear", "Tinted", "Obscure"]
  },
  {
    id: 9,
    name: "Hinged Door",
    images: [
      "/assets/11Hinged Door (Swing Door)/111.jpg",
      "/assets/11Hinged Door (Swing Door)/112.jpg",
      "/assets/11Hinged Door (Swing Door)/113.avif"
    ],
    category: "door",
    price: "₹12,000",
    description: "Classic hinged door attached to frame with durable hinges. Opens inward or outward smoothly. Perfect for main doors, bedrooms, and bathrooms. Features solid construction with premium finish.",
    features: ["Durable hinges", "Smooth opening", "Various finishes", "Strong security", "Low maintenance"],
    sizes: ["3ft x 7ft", "3.5ft x 7ft", "4ft x 7ft", "Custom sizes available"],
    colors: ["White", "Brown", "Black", "Wooden finish", "Grey"]
  },
  {
    id: 10,
    name: "Sliding Door",
    images: [
      "/assets/12. Sliding Door/121.jpg",
      "/assets/12. Sliding Door/122.jpg",
      "/assets/12. Sliding Door/123.avif"
    ],
    category: "door",
    price: "₹25,000",
    description: "Modern sliding door that slides horizontally on a track. Saves space as it doesn't swing open. Ideal for balconies, patios, wardrobes, and room dividers.",
    features: ["Space saving", "Smooth sliding", "Double track system", "Weather stripping", "Security lock"],
    sizes: ["5ft x 7ft", "6ft x 7ft", "8ft x 7ft", "Custom sizes available"],
    colors: ["White", "Black", "Brown", "Grey", "Wooden finish"]
  },
  {
    id: 11,
    name: "Folding Door",
    images: [
      "/assets/13. Folding Door (Bi-Fold Door)/131.jpg",
      "/assets/13. Folding Door (Bi-Fold Door)/132.jpg",
      "/assets/13. Folding Door (Bi-Fold Door)/133.webp"
    ],
    category: "door",
    price: "₹35,000",
    description: "Bi-fold door made of panels that fold together accordion-style. Perfect for closets, partitions, and small spaces. Creates wide opening and maximizes space.",
    features: ["Accordion folding", "Wide opening", "Space efficient", "Modern look", "Smooth hinges"],
    sizes: ["5ft x 7ft", "6ft x 7ft", "8ft x 7ft", "Custom sizes available"],
    colors: ["White", "Wooden finish", "Black", "Grey"]
  },
  {
    id: 12,
    name: "Pivot Door",
    images: [
      "/assets/14. Pivot Door/141.jpg",
      "/assets/14. Pivot Door/142.jpg",
      "/assets/14. Pivot Door/143.jpg"
    ],
    category: "door",
    price: "₹45,000",
    description: "Modern pivot door that rotates on a pivot hinge at top and bottom. Stylish and elegant design often used for luxury main entrances. Creates dramatic entrance effect.",
    features: ["Pivot rotation", "Modern design", "Luxury appearance", "Smooth operation", "Unique style"],
    sizes: ["3.5ft x 7ft", "4ft x 7ft", "4.5ft x 8ft", "Custom sizes available"],
    colors: ["White", "Black", "Grey", "Wooden finish", "Bronze"]
  },
  {
    id: 13,
    name: "French Door",
    images: [
      "/assets/15. French Door/151.jpg",
      "/assets/15. French Door/152.jpg",
      "/assets/15. French Door/153.avif"
    ],
    category: "door",
    price: "₹40,000",
    description: "Elegant French door with two doors featuring glass panels. Opens outward or inward from the center. Used for balconies, gardens, and living rooms.",
    features: ["Double door design", "Glass panels", "Center opening", "Classic elegance", "Natural light"],
    sizes: ["5ft x 7ft", "6ft x 7ft", "6ft x 8ft", "Custom sizes available"],
    colors: ["White", "Black", "Brown", "Wooden finish"]
  },
  {
    id: 14,
    name: "Flush Door",
    images: [
      "/assets/16. Flush Door/161.jpg",
      "/assets/16. Flush Door/162.webp",
      "/assets/16. Flush Door/163.webp"
    ],
    category: "door",
    price: "₹8,000",
    description: "Modern flat and smooth surface flush door. Very common in modern homes and offices. Affordable and simple design with clean lines.",
    features: ["Flat surface", "Modern look", "Affordable", "Easy to maintain", "Clean design"],
    sizes: ["3ft x 7ft", "3.5ft x 7ft", "4ft x 7ft", "Custom sizes available"],
    colors: ["White", "Brown", "Black", "Grey", "Wooden finish"]
  },
  {
    id: 15,
    name: "Glass Door",
    images: [
      "/assets/17. Glass Door/171.jpg",
      "/assets/17. Glass Door/172.jpg",
      "/assets/17. Glass Door/173.jpg"
    ],
    category: "door",
    price: "₹20,000",
    description: "Modern glass door that allows natural light to flow through. Available in framed or frameless design. Perfect for offices, balconies, and shops.",
    features: ["Maximum light", "Frameless option", "Modern design", "Tempered glass", "Various finishes"],
    sizes: ["3ft x 7ft", "3.5ft x 7ft", "4ft x 7ft", "Custom sizes available"],
    colors: ["Clear", "Frosted", "Tinted", "Reflective"]
  },
  {
    id: 16,
    name: "Dutch Door",
    images: [
      "/assets/18. Dutch Door/181.jpg",
      "/assets/18. Dutch Door/182.jpg",
      "/assets/18. Dutch Door/183.jpg"
    ],
    category: "door",
    price: "₹18,000",
    description: "Unique Dutch door split horizontally into two parts. Top and bottom can open separately. Used in farmhouses, kitchens, and utility areas.",
    features: ["Split design", "Independent opening", "Versatile use", "Classic style", "Ventilation control"],
    sizes: ["3ft x 7ft", "3.5ft x 7ft", "Custom sizes available"],
    colors: ["White", "Brown", "Wooden finish", "Black"]
  }
]

export default products
