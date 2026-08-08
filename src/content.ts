export type Service = { number: string; shortTitle: string; title: string; description: string };
export type Stat = { value: number; suffix: string; label: string };
export type Testimonial = { quote: string; name: string; role: string };
export const icons = ["plane", "ship", "truck", "perfume-bottle", "box", "forklift", "hazard-drum", "stamp", "scooter"] as const;
export type CargoIconName = (typeof icons)[number];

export const stats: Stat[] = [
  { value: 60, suffix: "+", label: "Global Channel Partners" },
  { value: 1580, suffix: "+", label: "Clients Served" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Warehouses in UAE" },
];

export const services: Service[] = [
  { number: "01", shortTitle: "AIR", title: "Air Freight", description: "Priority lift, precise routing, and full shipment visibility." },
  { number: "02", shortTitle: "OCEAN", title: "Ocean Freight", description: "Flexible FCL and LCL capacity across the world’s major ports." },
  { number: "03", shortTitle: "LAND", title: "Land Freight", description: "Reliable regional and cross-border road transport." },
  { number: "04", shortTitle: "SCENT", title: "Perfume & Fragrance Logistics", description: "Specialist handling for high-value and regulated fragrance cargo." },
  { number: "05", shortTitle: "PACK", title: "Packaging Solutions", description: "Cargo-ready protection engineered for every mode and mile." },
  { number: "06", shortTitle: "STORE", title: "Warehousing & Distribution", description: "Smart storage and fast fulfillment close to your customers." },
  { number: "07", shortTitle: "DG", title: "DG Cargo Handling", description: "Compliant dangerous-goods movement by certified specialists." },
  { number: "08", shortTitle: "CLEAR", title: "Customs Clearance", description: "Documentation and brokerage that keep borders frictionless." },
  { number: "09", shortTitle: "RUSH", title: "Courier Services", description: "Time-critical, door-to-door delivery with live updates." },
];

export const countries = ["UAE", "INDIA", "SINGAPORE", "GERMANY", "UNITED KINGDOM", "UNITED STATES", "CHINA", "SOUTH AFRICA"];
export const awards = [
  { year: "2025", title: "Regional Logistics Partner", source: "Placeholder Freight Awards" },
  { year: "2024", title: "Excellence in DG Handling", source: "Placeholder Safety Council" },
  { year: "2023", title: "Fastest Growing Network", source: "Placeholder Trade Forum" },
  { year: "2022", title: "Customer Choice Award", source: "Placeholder Cargo Review" },
];
export const facilityFeatures = [
  { number: "01", title: "Bonded & secure", copy: "Controlled access and round-the-clock monitoring for valuable cargo." },
  { number: "02", title: "Climate ready", copy: "Zoned temperature management for sensitive goods and fragrances." },
  { number: "03", title: "Built to move", copy: "High-throughput docks and optimized pick-and-pack workflows." },
  { number: "04", title: "Always visible", copy: "Inventory and movement status available through one connected view." },
];
export const testimonials: Testimonial[] = [
  { quote: "IMEX turned our most complex lane into the easiest part of our supply chain.", name: "Maya Chen", role: "COO, Placeholder Labs" },
  { quote: "Fast answers, accurate milestones, and no surprises at the border.", name: "Omar Haddad", role: "Supply Director, Placeholder Group" },
  { quote: "They operate like an extension of our own team—calm, exact, and always moving.", name: "Leah Morgan", role: "Founder, Placeholder Goods" },
];
