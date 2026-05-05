export interface Project {
  id: string;
  name: string;
  location: string;
  status: "ongoing" | "completed" | "upcoming";
  highlights: string[];
  description: string;
  image: string;
  price: string;
  rera: string | string[];
  amenities: string[];
  specifications: {
    type: string;
    area: string;
    units: string;
    floors: string;
  };
  gallery: string[];
  mapUrl: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
    {
    id: "nilgiri-project",
    name: "Nilgiri",
    location: "AJMER ROAD, MAHLA JAIPUR",
    status: "ongoing",
    highlights: ["Residential And Commercial Plots","160 Ft roads", "World Class Facilities", "Gated Township" ,"Rera Approved", "JDA Approved"],
    description: "Discover Nilgiri — a RERA & JDA approved gated township on Ajmer Road, Jaipur, offering residential and commercial plots along with ready shops. Thoughtfully planned with all modern amenities and a prime location, it's the perfect destination for families and investors alike.",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1778003234/Nilgiri-project_negkbt.png",
    price: "Starting ₹15 Lakh", 
    rera: ["RAJ/P/2017/427"],
    amenities: ["Gated Township","Underground Electrification","Swarage Management System", "Overhead Water tank", "Drainage System", "Landscaped Gardens","Swimming Pool","Greener common aeras","Tower lighing roads","Children's Play Area", "High visibility Location","Shop Friendly","Strong footfall Potential","Temple", "Landscaped Gardens","Water Harvesting", "24/7 Security", "Dedicated Commercial Zone"],
    specifications: {
      type: "Residential Plots,Comercial Spaces, Retail Shops",
      area: "50 - 1775 sq.ft",
      units: "565 Units",
      floors: "N/A"
    },
    gallery: ["https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482810/Desire-Realty-website-images/public/brijeshwar%20avenue/ameneties.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482808/Desire-Realty-website-images/public/brijeshwar%20avenue/first_floor.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482807/Desire-Realty-website-images/public/brijeshwar%20avenue/flats.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482805/Desire-Realty-website-images/public/brijeshwar%20avenue/location_map.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482804/Desire-Realty-website-images/public/brijeshwar%20avenue/specifications.png"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3558.299135892591!2d75.69098107543886!3d26.893999976658318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUzJzM4LjQiTiA3NcKwNDEnMzYuOCJF!5e0!3m2!1sen!2sin!4v1769861421134!5m2!1sen!2sin"
  },
  {
    id: "brajeshwar-avenue",
    name: "Brajeshwar Avenue",
    location: "AT GANDHI PATH WEST, VAISHALI NAGAR, JAIPUR",
    status: "ongoing",
    highlights: ["Ultra Luxurious 3/4 BHK Apartments", "World Class Facilities","Rera Approved", "JDA Approved"],
    description: "Experience luxury living at its finest with Brajeshwar Avenue. Located in the heart of Jaipur, this premium residential project offers world-class amenities and contemporary architecture designed for modern families.",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482788/Desire-Realty-website-images/public/project-avenue.png",
    price: "Starting ₹80 Lakh", 
    rera: ["RAJ/P/2025/4285"],
    amenities: ["Mini Theater","Swimming Pool", "Gymnasium", "Clubhouse", "Children's Play Area", "Terrace Garden","Gazebo","EV Charging","Temple", "Landscaped Gardens","Water Harvesting", "24/7 Security", "Covered Parking", "Power Backup", "Smart Featured Lifts system","CCTV Surveillance","Fire Safety Systems"],
    specifications: {
      type: "3, 4 BHK Apartments",
      area: "1,588.8 - 2,375.1 sq.ft.",
      units: "30 Units",
      floors: "G + 6 Floors"
    },
    gallery: ["https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482810/Desire-Realty-website-images/public/brijeshwar%20avenue/ameneties.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482808/Desire-Realty-website-images/public/brijeshwar%20avenue/first_floor.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482807/Desire-Realty-website-images/public/brijeshwar%20avenue/flats.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482805/Desire-Realty-website-images/public/brijeshwar%20avenue/location_map.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482804/Desire-Realty-website-images/public/brijeshwar%20avenue/specifications.png"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3558.299135892591!2d75.69098107543886!3d26.893999976658318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUzJzM4LjQiTiA3NcKwNDEnMzYuOCJF!5e0!3m2!1sen!2sin!4v1769861421134!5m2!1sen!2sin"
  },
{
  id: "nri-avenue",
  name: "NRI AVENUE",
  location: "Jagatpura, Jaipur, Rajasthan",
  status: "completed",
  highlights: [
    "Situated on 200 Ft. Road adjoining Jaipur Chaupati",
    "Two Side Open Project",
    "G+11 Mixed-Use Development with Shopping, Offices & Studio Apartments",
    "TAJ Group of Hostels on Floors 11th–14th Floors"
  ],
  description: "NRI Avenue is a premium vertical lifestyle destination located in the heart of Jagatpura, adjoining Jaipur Chaupati & opposite the iconic NRI Scheme. This G+11 marvel offers exclusive shopping on lower ground & first floor, a gaming zone & food court on the second floor, corporate offices on floors 3–5, studio apartments with gym & indoor games on the sixth floor, and studio apartments from the seventh to eleventh floor — with a multifunctional terrace at the top.",
  image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413514/NRI_AVENUE_FRONT_2_dizckp.png",
  price: "Contact for Pricing",
  rera: "RAJ/P/2025/3620",
  amenities: [
    "Gaming Zone & Bowling Alley",
    "Food Court & Lounge",
    "Gym & Indoor Games",
    "Multifunctional Rooftop Terrace",
    "Clubhouse with Premium Amenities",
    "Centralized AC (Shopping Floors)",
    "24-Hour Power Backup",
    "Multilevel Security with CCTV",
    "Hydro Pneumatic Water Supply",
    "Rainwater Harvesting",
    "3 High-Quality Lifts for Studio Apartments",
    "2 Dedicated Lifts for Offices",
    "Escalators from First to Second Floor",
    "2 Basement Parking Levels"
  ],
  specifications: {
    type: "Studio Apartments, Corporate Offices, Retail Shops, Food Kiosks",
    area: "93 - 6,297 sq.ft. (varies by unit type)",
    units: "Multiple Units across all floors",
    floors: "G + 14 Floors + 2 Basements"
  },
  gallery: ["https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413514/NRI_AVENUE_FRONT_2_dizckp.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413512/NRI_AVENUE_FRONT_fd4lxi.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413518/NRI_AVENUE_GAMING_ZONE_ubfwzi.jpg",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413522/NRI_AVENUE_HOME_INTERIORS_dfv3ax.jpg",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413527/NRI_AVENUE_OUTDOOR_PORTION_ztj9dl.jpg",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413525/NRI_AVENUE_MAP_fonir0.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413538/NRI_AVENUE_SHOPPING_COMPLEX_i5htpm.jpg",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413542/NRI_AVENUE_TOP_VIEW_swhmzt.jpg",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413521/NRI_AVENUE_GROUND_FLOOR_PLAN_asn1nd.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413526/NRI_AVENUE_LOWER_GROUND_FLOOR_PLAN_wjwytu.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413533/NRI_AVENUE_SECOND_FLOOR_PLAN_yhyv7x.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413511/NRI_AVENUE_FOUR_AND_FIFTH_FLOOR_PLAN_loqet5.png",
"https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771413534/NRI_AVENUE_SEVENTH_TO_ELEVENTH_FLOOR_PLAN_ewc7dp.png"
],
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.724667792751!2d75.84657659999999!3d26.8168942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc90078acc7d7%3A0x5fef64f742c65495!2sVirat%20NRI%20Avenue%20-%20Commercial%20Space%20in%20Jagatpura%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1771413965370!5m2!1sen!2sin"
},
{
    id: "smart-city",
    name: "Smart City",
    location: "Chaksu, NH - 8 Jaipur, Jaipur",
    status: "completed",
    highlights: ["Premium Residential Plots", "Gated Township", "Close to Bus Stand", "On National Highway"],
    description: "Invest in your dream home at Smart City, a premium villa plots project located directly on the National Highway with excellent accessibility. Situated within walking distance from the bus stand and officially approved by the Chaksu Municipality (Nagar Palika), the project ensures both convenience and regulatory assurance. Designed for end users seeking long-term value, Smart City offers a well-connected, future-ready foundation for building your ideal home.",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482803/Desire-Realty-website-images/public/Smart_City/first.png",
    price: "Starting ₹10 Lakh",
    rera: "",
    amenities: ["Wide Internal Roads", "Underground Electricity Lines", "Water Supply", "Street Lighting", "Gated Township", "Parks", "Kids Play Zone", "Temple", "Easy Connectivity","Green & Open Spaces","Plot Demarcation"],
    specifications: {
      type: "Residential Plots",
      area: "450 - 1530 sq.ft.",
      units: "40+ Plots",
      floors: "N/A"
    },
    gallery: ["https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482800/Desire-Realty-website-images/public/Smart_City/second.png", "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482801/Desire-Realty-website-images/public/Smart_City/map.png"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3568.036054986725!2d75.94573997542817!3d26.583218276845088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDM0JzU5LjYiTiA3NcKwNTYnNTMuOSJF!5e0!3m2!1sen!2sin!4v1769846625631!5m2!1sen!2sin"
  },
  {
    id: "ganesh-vihar",
    name: "Ganesh Vihar",
    location: "Chaksu, NH - 8 Jaipur, Jaipur",
    status: "completed",
    highlights: ["Premium Residential Plots", "RERA Approved", "Close to Bus Stand", "On National Highway"],
    description: "Invest in your dream home at Ganesh Vihar, a premium villa plots project located directly on the National Highway with excellent accessibility. Situated within walking distance from the bus stand and officially approved by the Chaksu Municipality (Nagar Palika), the project ensures both convenience and regulatory assurance. Designed for end users seeking long-term value, Ganesh Vihar offers a well-connected, future-ready foundation for building your ideal home.",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482815/Desire-Realty-website-images/src/assets/project-3.jpg",
    price: "Starting ₹10 Lakh",
    rera: "RAJ/P/2025/4132 | RAJ/P/2025/4111",
    amenities: ["Wide Internal Roads", "Underground Electricity Lines", "Sewage Treatment", "Water Supply", "Street Lighting", "Gated Township", "Parks", "Kids Play Zone", "Temple", "RERA Approved","Green & Open Spaces","Plot Demarcation"],
    specifications: {
      type: "Residential Plots",
      area: "933 - 2504 sq.ft.",
      units: "150+ Plots",
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
    comingSoon: true,
    highlights: ["Luxury Flats", "Hanging Gardens", "Gated Community"],
    description: "A prestigious gated community offering spacious independent Flats with hanging gardens. Each flat is crafted with attention to detail, providing the perfect blend of privacy and community living.",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482817/Desire-Realty-website-images/src/assets/project-2.jpg",
    price: "Starting ₹60 Lakh",
    rera: "",
    amenities: ["Clubhouse", "Swimming Pool", "Tennis Court", "Jogging Track", "Kids Play Zone", "24/7 Security", "Community Hall", "Landscaped Parks"],
    specifications: {
      type: "3, 4 BHK Flats",
      area: "3,200 - 4,800 sq.ft.",
      units: "86 Flats",
      floors: "G + 2 Floors"
    },
    gallery: [],
    mapUrl: ""  }
];

