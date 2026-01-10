export interface Project {
  id: string;
  name: string;
  location: string;
  status: "ongoing" | "completed" | "upcoming";
  highlights: string[];
  description: string;
  image: string;
  price: string;
  rera: string;
  amenities: string[];
  specifications: {
    type: string;
    area: string;
    units: string;
    floors: string;
  };
  gallery: string[];
  mapUrl: string;
}

export const projects: Project[] = [
  {
    id: "desire-heights",
    name: "Desire Heights",
    location: "Whitefield, Bangalore",
    status: "ongoing",
    highlights: ["Premium 2/3 BHK Apartments", "Rooftop Infinity Pool", "Smart Home Ready"],
    description: "Experience luxury living at its finest with Desire Heights. Located in the heart of Whitefield, this premium residential project offers world-class amenities and contemporary architecture designed for modern families.",
    image: "/project-1.jpg",
    price: "Starting ₹1.2 Cr",
    rera: "RERA/KA/PROJA/2024/001234",
    amenities: ["Swimming Pool", "Gymnasium", "Clubhouse", "Children's Play Area", "Landscaped Gardens", "24/7 Security", "Covered Parking", "Power Backup"],
    specifications: {
      type: "2, 3 BHK Apartments",
      area: "1,200 - 2,100 sq.ft.",
      units: "240 Units",
      floors: "G + 24 Floors"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7252068675045!2d77.7410!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwNDQnMjcuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
  },
  {
    id: "desire-villa-gardens",
    name: "Desire Villa Gardens",
    location: "Sarjapur Road, Bangalore",
    status: "completed",
    highlights: ["Luxury Independent Villas", "Private Gardens", "Gated Community"],
    description: "A prestigious gated villa community offering spacious independent homes with private gardens. Each villa is crafted with attention to detail, providing the perfect blend of privacy and community living.",
    image: "/project-2.jpg",
    price: "Starting ₹2.8 Cr",
    rera: "RERA/KA/PROJA/2023/005678",
    amenities: ["Clubhouse", "Swimming Pool", "Tennis Court", "Jogging Track", "Kids Play Zone", "24/7 Security", "Community Hall", "Landscaped Parks"],
    specifications: {
      type: "4, 5 BHK Villas",
      area: "3,200 - 4,800 sq.ft.",
      units: "86 Villas",
      floors: "G + 2 Floors"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0!2d77.7800!3d12.9000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
  },
  {
    id: "desire-greens",
    name: "Desire Greens",
    location: "Devanahalli, Bangalore",
    status: "ongoing",
    highlights: ["Premium Villa Plots", "BMRDA Approved", "Close to Airport"],
    description: "Invest in your dream home with Desire Greens premium villa plots. Strategically located near the international airport with excellent connectivity, these BMRDA approved plots offer the perfect foundation for your future.",
    image: "/project-3.jpg",
    price: "Starting ₹65 Lakh",
    rera: "RERA/KA/PROJA/2024/009876",
    amenities: ["Wide Internal Roads", "Underground Electricity", "Sewage Treatment", "Water Supply", "Street Lighting", "Gated Entry", "Parks", "Commercial Zone"],
    specifications: {
      type: "Villa Plots",
      area: "1,200 - 2,400 sq.ft.",
      units: "156 Plots",
      floors: "N/A"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d77.7100!3d13.2000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDEyJzAwLjAiTiA3N8KwNDInMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
  },
  {
    id: "desire-urbania",
    name: "Desire Urbania",
    location: "Electronic City, Bangalore",
    status: "upcoming",
    highlights: ["Modern Townhouses", "Pre-Launch Prices", "IT Hub Location"],
    description: "Coming soon to Electronic City, Desire Urbania presents contemporary townhouses designed for the modern professional. Enjoy pre-launch benefits and be among the first to own a home in this premium development.",
    image: "/project-4.jpg",
    price: "Pre-Launch Price Available",
    rera: "RERA Registration Pending",
    amenities: ["Clubhouse", "Swimming Pool", "Gym", "Co-working Space", "EV Charging", "Smart Home Features", "Rooftop Deck", "Pet Zone"],
    specifications: {
      type: "3, 4 BHK Townhouses",
      area: "1,800 - 2,600 sq.ft.",
      units: "120 Units",
      floors: "G + 3 Floors"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d77.6600!3d12.8400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwMzknMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
  }
];
