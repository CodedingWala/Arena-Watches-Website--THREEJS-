/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BRAND_NAME = "ARENA";
export const BRAND_TAGLINE = "Time, Engineered.";

export const COLORS = {
  obsidian: "#0A0A0B",
  graphite: "#151517",
  champagneGold: "#C9A55C",
  champagneGoldBright: "#E8C87D",
  platinum: "#D8D9DB",
  platinumDim: "#8A8C90",
  ivory: "#F5F3EE",
  crimsonAccent: "#7A1F2B"
};

export interface FeatureBlock {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stat?: string;
  angle: { x: number; y: number; z: number };
  zoom: number;
}

export const PRECISION_FEATURES: FeatureBlock[] = [
  {
    id: "calibre",
    eyebrow: "THE HEARTBEAT",
    title: "In-House Calibre V.81",
    description: "An automatic mechanical movement designed, manufactured, and hand-assembled entirely in India. Comprising 214 meticulously finished components.",
    stat: "214 Parts",
    angle: { x: 0, y: Math.PI * 0.5, z: 0 },
    zoom: 1.5
  },
  {
    id: "reserve",
    eyebrow: "ENDURING POWER",
    title: "72-Hour Power Reserve",
    description: "Dual-barrel engineering ensures consistent torque delivery for three full days, maintaining absolute precision even when unworn over a weekend.",
    stat: "72 Hours",
    angle: { x: Math.PI * 0.25, y: Math.PI * 1.2, z: 0 },
    zoom: 1.2
  },
  {
    id: "accuracy",
    eyebrow: "CHRONOMETRIC RESTLESSNESS",
    title: "±2 Seconds Daily Deviation",
    description: "Individually calibrated across five positions and three temperatures, exceeding international chronometer standards for flawless daily operation.",
    stat: "±2s / Day",
    angle: { x: -Math.PI * 0.1, y: Math.PI * 0.8, z: Math.PI * 0.1 },
    zoom: 1.8
  },
  {
    id: "shield",
    eyebrow: "INVISIBLE SHIELD",
    title: "Anti-Magnetic Assembly",
    description: "Utilizing a silicon balance spring and non-ferrous escape wheel, the movement resists magnetic interference up to 4,800 A/m from modern electronics.",
    stat: "4.8k A/m",
    angle: { x: Math.PI * 0.5, y: 0, z: Math.PI * 0.5 },
    zoom: 1.6
  }
];

export interface MaterialCard {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  spec: string;
  color: string;
  textureType: "titanium" | "sapphire" | "leather" | "steel" | "ceramic";
}

export const MATERIALS_DATA: MaterialCard[] = [
  {
    id: "titanium",
    name: "Surgical-Grade Titanium",
    eyebrow: "LIGHTWEIGHT RESILIENCE",
    description: "Forged under extreme pressure, our Grade 5 Titanium offers double the strength of steel at half the weight. Hypoallergenic, extremely corrosion-resistant, and finished with a bespoke brushed satin texture.",
    spec: "Grade 5 Alloy",
    color: "#4A4D50",
    textureType: "titanium"
  },
  {
    id: "sapphire",
    name: "Arched Sapphire Crystal",
    eyebrow: "OPTICAL CLARITY",
    description: "Second only to diamond in hardness. Our scratch-proof sapphire crystal is cut with a double-domed curve and layered with five coatings of anti-reflective film for perfect legibility in any glare.",
    spec: "9 Mohs Hardness",
    color: "#A5C6E1",
    textureType: "sapphire"
  },
  {
    id: "leather",
    name: "Vegetable-Tanned Leather",
    eyebrow: "ORGANIC TRADITION",
    description: "Sourced from historic, sustainable tanneries in Southern India. Tanned with organic acacia bark to develop a deep, personalized amber patina over years of wear. Hand-stitched with reinforced linen thread.",
    spec: "Bark-Tanned Full Grain",
    color: "#5C3E21",
    textureType: "leather"
  },
  {
    id: "steel",
    name: "316L Stainless Steel",
    eyebrow: "TIMELESS LUSTER",
    description: "Highly refined low-carbon alloy selected for its exceptional luster and resistance to pitting. Mirror-polished using traditional hand-lapping techniques by our master artisans.",
    spec: "316L Marine Grade",
    color: "#8E9194",
    textureType: "steel"
  },
  {
    id: "ceramic",
    name: "Monolithic Ceramic Bezel",
    eyebrow: "UNALTERABLE BEAUTY",
    description: "Sintered at 1,400°C, the zirconium oxide bezel is virtually impervious to scratches and UV degradation, retaining its deep obsidian sheen for generations.",
    spec: "Zirconium Oxide",
    color: "#1E1F21",
    textureType: "ceramic"
  }
];

export interface BentoFeature {
  id: string;
  title: string;
  description: string;
  size: "large" | "medium" | "small";
  metric?: string;
  iconName: string;
}

export const BENTO_FEATURES: BentoFeature[] = [
  {
    id: "water-res",
    title: "Deep Sea Pressure Sealed",
    description: "Engineered with a triple-gasket screw-down crown and a reinforced case back to withstand pressures up to 20 atmospheres, making it resilient in both boardroom and ocean.",
    size: "large",
    metric: "200m / 660ft",
    iconName: "ShieldAlert"
  },
  {
    id: "strap-sys",
    title: "Interchangeable Strap System",
    description: "Transition from formal steel to casual leather in four seconds. A patented dual-locking quick-release mechanism built seamlessly into the lugs.",
    size: "medium",
    iconName: "RefreshCw"
  },
  {
    id: "lume",
    title: "Bespoke Swiss Super-LumiNova",
    description: "A customized Grade X1 pigments compound applied in triple layers onto the hands and index markers, glowing in signature deep-turquoise for 8 hours.",
    size: "medium",
    metric: "Grade X1",
    iconName: "Compass"
  },
  {
    id: "warranty",
    title: "5-Year Global Commitment",
    description: "Every ARENA timepiece is backed by an international warranty covering mechanical integrity and material excellence, managed through our global ateliers.",
    size: "small",
    metric: "5 Years",
    iconName: "Award"
  },
  {
    id: "origin",
    title: "Indian Heritage Craft",
    description: "Each watch face features subtle circular guilloché patterns inspired by sacred geometry from historic Indian architecture, carved with micron-precision.",
    size: "small",
    iconName: "Compass"
  },
  {
    id: "nfc-auth",
    title: "NFC Cryptographic Core",
    description: "An invisible, passive cryptographic microcontroller embedded inside the sapphire case back. A simple phone tap instantly verifies registry ownership and chronometric logs.",
    size: "small",
    metric: "Secured",
    iconName: "Shield"
  }
];

export interface WatchVariant {
  id: string;
  name: string;
  strapColor: string;
  dialColor: string;
  caseColor: string;
  metallic: number;
  roughness: number;
}

export const WATCH_VARIANTS: WatchVariant[] = [
  {
    id: "midnight",
    name: "Midnight Obsidian",
    strapColor: "#1A1A1E",
    dialColor: "#0D0D0E",
    caseColor: "#A6A7AA",
    metallic: 0.9,
    roughness: 0.2
  },
  {
    id: "champagne",
    name: "Champagne Gold",
    strapColor: "#2C1B10",
    dialColor: "#1A1510",
    caseColor: "#D4AF37",
    metallic: 0.95,
    roughness: 0.15
  },
  {
    id: "steel-blue",
    name: "Steel Blue",
    strapColor: "#121E2D",
    dialColor: "#1A2F45",
    caseColor: "#D8D9DB",
    metallic: 0.85,
    roughness: 0.25
  },
  {
    id: "racing-crimson",
    name: "Racing Crimson",
    strapColor: "#2B0B10",
    dialColor: "#4A0E17",
    caseColor: "#333333",
    metallic: 0.9,
    roughness: 0.3
  }
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "ARENA represents a stunning shift in watchmaking. It balances the uncompromising technical rigor of high-complication horology with a rich, quiet Indian-heritage aesthetic that doesn't scream for attention.",
    author: "Aditya Rao",
    title: "Industrial Design Critic & Collector"
  },
  {
    id: "t2",
    quote: "On the wrist, the Grade 5 Titanium case feels almost weightless, yet the mechanical presence of the Calibre V.81 automatic movement is commanding. The architectural geometry of the dial is a masterclass in restraint.",
    author: "Meera Krishnan",
    title: "Founding Editor, Horological India"
  },
  {
    id: "t3",
    quote: "To find a watch that houses an entirely in-house movement of this precision, crafted with hand-lapped finishings and this level of visual polish, is extremely rare. It's an heirloom for the modern age.",
    author: "Vikramjit Singh",
    title: "Aviation Chronograph Historian"
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What makes the Calibre V.81 movement unique?",
    answer: "The Calibre V.81 is ARENA's signature in-house automatic movement. Designed and hand-assembled in our state-of-the-art micro-engineering facility in MUMBAI, it contains 214 components and runs at 28,800 vibrations per hour (4Hz). Every single bridge is hand-beveled with anglage finishings, combining classic horology with modern computer-aided calibration."
  },
  {
    id: "faq-2",
    question: "How do I purchase or reserve a ARENA timepiece?",
    answer: "To preserve exclusivity and maintain our rigorous quality standards, we produce ARENA timepieces in numbered, limited-batch runs. You can register your interest or reserve a build slot from our next batch directly through our digital concierge ('Reserve Yours' button). A brand advisor will contact you within 24 hours to guide you through customization and delivery."
  },
  {
    id: "faq-3",
    question: "Does ARENA offer international servicing?",
    answer: "Yes. Every watch is covered by a 5-year international warranty. We have certified service ateliers in New York, London, Tokyo, and Mumbai, as well as a secure, fully-insured concierge pick-up service. Because the Calibre V.81 was built with modular architectures, it can be seamlessly serviced by any of our authorized watchmakers worldwide."
  },
  {
    id: "faq-4",
    question: "How does the interchangeable strap system work?",
    answer: "Each watch is shipped with a premium brushed-titanium bracelet and a bark-tanned full-grain leather strap. Built into the underside of the strap lugs is a proprietary, flush dual-trigger mechanism. Squeezing these triggers retracts the spring bar instantly, allowing you to swap bands in seconds without any tools or scratching the case."
  },
  {
    id: "faq-5",
    question: "Is the watch water-resistant for swimming or diving?",
    answer: "Absolutely. ARENA watches are designed to be high-performance sports watches wrapped in luxury aesthetics. Featuring a robust screw-down crown, a screw-in display back, and dynamic high-pressure gaskets, the case is fully rated for water resistance up to 200 meters (20 ATM). It is suitable for swimming, snorkeling, and recreational water sports."
  },
  {
    id: "faq-6",
    question: "What is your return and authenticity verification policy?",
    answer: "We offer a 14-day, fully-insured return policy for unworn timepieces in their original packaging. Every ARENA watch is embedded with a secure, passive cryptographic micro-chip in the sapphire case back. Tapping your NFC-enabled phone against the watch instantly verifies its authenticity, displaying its batch number, master watchmaker, and chronometric test logs."
  }
];

export const TECHNICAL_SPECS = {
  movement: {
    label: "Movement",
    value: "Calibre V.81 In-House Automatic, bi-directional winding, hacking seconds, hand-finished bridges"
  },
  case: {
    label: "Case Material",
    value: "Grade 5 Titanium (Surgical grade), brushed satin finishing with hand-polished chamfers"
  },
  diameter: {
    label: "Case Diameter",
    value: "41.0 mm"
  },
  thickness: {
    label: "Case Thickness",
    value: "11.8 mm"
  },
  lugToLug: {
    label: "Lug-to-Lug",
    value: "48.2 mm"
  },
  waterRes: {
    label: "Water Resistance",
    value: "200 meters (20 ATM / 660 feet), screw-down crown with triple gasket system"
  },
  crystal: {
    label: "Glass",
    value: "Double-domed sapphire crystal with 5 layers of anti-reflective coating on both sides"
  },
  powerReserve: {
    label: "Power Reserve",
    value: "72 hours (Dual-barrel winding)"
  },
  strap: {
    label: "Strap & Clasp",
    value: "Grade 5 Titanium bracelet + additional bark-tanned leather strap, with quick-release system"
  },
  accuracy: {
    label: "Chronometric Accuracy",
    value: "±2 seconds per day, tested in 5 positions and temperature cycles"
  },
  frequency: {
    label: "Frequency",
    value: "28,800 vibrations per hour (4 Hz), silicon balance spring"
  },
  warranty: {
    label: "Warranty",
    value: "5-Year comprehensive international warranty with lifetime service plan eligibility"
  }
};
