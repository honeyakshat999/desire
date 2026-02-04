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
    id: "brajeshwar-avenue",
    name: "Brajeshwar Avenue",
    location: "AT GANDHI PATH WEST, VAISHALI NAGAR, JAIPUR",
    status: "ongoing",
    highlights: ["Premium 3/4 BHK Apartments", "World Class Facilities","Rera Approved", "JDA Approved"],
    description: "Experience luxury living at its finest with Desire Heights. Located in the heart of Whitefield, this premium residential project offers world-class amenities and contemporary architecture designed for modern families.",
    image: "/project-avenue.png",
    price: "Starting ₹1.2 Cr",
    rera: "RERA/KA/PROJA/2024/001234",
    amenities: ["Mini Theater","Swimming Pool", "Gymnasium", "Clubhouse", "Children's Play Area", "Terrace Garden","Gazebo","EV Charging","Temple", "Landscaped Gardens","Water Harvesting", "24/7 Security", "Covered Parking", "Power Backup", "Smart Featured Lifts system","CCTV Surveillance","Fire Safety Systems"],
    specifications: {
      type: "2, 3 BHK Apartments",
      area: "1,200 - 2,100 sq.ft.",
      units: "240 Units",
      floors: "G + 24 Floors"
    },
    gallery: ["/brijeshwar avenue/ameneties.png", "/brijeshwar avenue/first_floor.png", "/brijeshwar avenue/flats.png", "/brijeshwar avenue/location_map.png", "/brijeshwar avenue/specifications.png"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3558.299135892591!2d75.69098107543886!3d26.893999976658318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUzJzM4LjQiTiA3NcKwNDEnMzYuOCJF!5e0!3m2!1sen!2sin!4v1769861421134!5m2!1sen!2sin"
  },
{
    id: "smart-city",
    name: "Smart City",
    location: "Chaksu, NH - 8 Jaipur, Jaipur",
    status: "completed",
    highlights: ["Premium Residential Plots", "RERA Approved", "Close to Bus Stand", "On National Highway"],
    description: "Invest in your dream home at Smart City, a premium villa plot project located directly on the National Highway with excellent accessibility. Situated within walking distance from the bus stand and officially approved by the Chaksu Municipality (Nagar Palika), the project ensures both convenience and regulatory assurance. Designed for end users seeking long-term value, Smart City offers a well-connected, future-ready foundation for building your ideal home.",
    image: "/Smart_City/first.png",
    price: "Starting ₹10 Lakh",
    rera: "TEST",
    amenities: ["Wide Internal Roads", "Underground Electricity Lines", "Water Supply", "Street Lighting", "Gated Township", "Parks", "Kids Play Zone", "Temple", "RERA Approved","Green & Open Spaces","Plot Demarcation"],
    specifications: {
      type: "Residential Plots",
      area: "933 - 2504 sq.ft.",
      units: "15+ Plots",
      floors: "N/A"
    },
    gallery: ["/Smart_City/second.png", "/Smart_City/map.png"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3568.036054986725!2d75.94573997542817!3d26.583218276845088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM0JzU5LjYiTiA3NcKwNTYnNTMuOSJF!5e0!3m2!1sen!2sin!4v1769846625631!5m2!1sen!2sin"
  },
  {
    id: "ganesh-vihar",
    name: "Ganesh Vihar",
    location: "Chaksu, NH - 8 Jaipur, Jaipur",
    status: "completed",
    highlights: ["Premium Residential Plots", "RERA Approved", "Close to Bus Stand", "On National Highway"],
    description: "Invest in your dream home at Ganesh Vihar, a premium villa plot project located directly on the National Highway with excellent accessibility. Situated within walking distance from the bus stand and officially approved by the Chaksu Municipality (Nagar Palika), the project ensures both convenience and regulatory assurance. Designed for end users seeking long-term value, Ganesh Vihar offers a well-connected, future-ready foundation for building your ideal home.",
    image: "/project-3.jpeg",
    price: "Starting ₹10 Lakh",
    rera: "RAJ/P/2025/4132",
    amenities: ["Wide Internal Roads", "Underground Electricity Lines", "Sewage Treatment", "Water Supply", "Street Lighting", "Gated Township", "Parks", "Kids Play Zone", "Temple", "RERA Approved","Green & Open Spaces","Plot Demarcation"],
    specifications: {
      type: "Residential Plots",
      area: "933 - 2504 sq.ft.",
      units: "99+ Plots",
      floors: "N/A"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3568.036054986725!2d75.94573997542817!3d26.583218276845088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM0JzU5LjYiTiA3NcKwNTYnNTMuOSJF!5e0!3m2!1sen!2sin!4v1769846625631!5m2!1sen!2sin"
  },
  {
    id: "brajeshwar-crown",
    name: "Brajeshwar Crown",
    location: "200 FT. road, Jaipur",
    status: "upcoming",
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
    id: "kesar-bagh",
    name: "Kesar Bagh",
    location: "TEST, Jaipur",
    status: "upcoming",
    highlights: ["Premium Residential Plots", "RERA Approved","On National Highway"],
    description: "Invest in your dream home at Kesar Bagh, a premium villa plot project located directly on the National Highway with excellent accessibility. the project ensures both convenience and regulatory assurance. Designed for end users seeking long-term value, Kesar Bagh offers a well-connected, future-ready foundation for building your ideal home.",
    image: "/project-5.jpeg",
    price: "Starting ₹20 Lakh",
    rera: "TEST",
    amenities: ["TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "Parks", "Kids Play Zone", "Temple", "RERA Approved","Green & Open Spaces","Plot Demarcation"],
    specifications: {
      type: "Residential Plots",
      area: "TEST",
      units: "test+ Plots",
      floors: "N/A"
    },
    gallery: [],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3568.036054986725!2d75.94573997542817!3d26.583218276845088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM0JzU5LjYiTiA3NcKwNTYnNTMuOSJF!5e0!3m2!1sen!2sin!4v1769846625631!5m2!1sen!2sin"
  }
];

