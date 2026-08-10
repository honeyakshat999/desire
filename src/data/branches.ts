export interface Branch {
  id: string;
  /** Heading shown above the address block. */
  label: string;
  /** Street line, rendered above the city line. */
  street: string;
  /** City, state and PIN, e.g. "Jaipur, Rajasthan 302033". */
  cityLine: string;
  /** Compact one-line variant for tight layouts like the About CTA strip. */
  shortAddress: string;
  /** Google Maps embed src consumed directly as an iframe src. */
  mapUrl: string;
}

export const branches: Branch[] = [
  {
    id: "pratap-nagar",
    label: "Head Office — Pratap Nagar",
    street: "111/14, Sector-11, Kumbha Marg, Pratap Nagar",
    cityLine: "Jaipur, Rajasthan 302033",
    shortAddress: "111/14, Sector-11, Pratap Nagar, Jaipur 302033",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2018440606857!2d75.82188627511756!3d26.801700964853058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9940991979f%3A0x20c215a9012762a4!2s143%2F111%2C%20Sector%2011%20Rd%2C%20Kumbha%20Marg%2C%20Sanganer%2C%20Sector%2011%2C%20Pratap%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302033!5e0!3m2!1sen!2sin!4v1768761364202!5m2!1sen!2sin",
  },
  {
    id: "mansarovar",
    label: "Mansarovar Branch",
    street: "SFS Chouraha, 112, New Sanganer Rd, GP Colony, Sumer Nagar, Sanganer",
    cityLine: "Jaipur, Rajasthan 302020",
    shortAddress: "112, New Sanganer Rd, Sumer Nagar, Jaipur 302020",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d889.9952627519158!2d75.76638812851918!3d26.84055499516005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db50075df05a3%3A0x1aa384208bbce9be!2sDDR%20GROUP%20(DREAM%20DWELL%20REALITY)!5e0!3m2!1sen!2sin!4v1786299266406!5m2!1sen!2sin",
  },
];
