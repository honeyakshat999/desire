import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ankit Singhal",
    role: "Plot Owner, Ganesh Vihar",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1770270658/ankit_edited_new_dxxxpw.jpg",
    content:
      "The entire experience with Desire Realty was exceptional. From site visits to possession, their team was professional and transparent. Our new Plot exceeds all expectations.",
    rating: 5,
  },
  {
    name: "Akshat Singhal",
    role: "Homeowner, Brajeshwar Avenue",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1770298773/Akshat_singhal_qz3ypg.jpg",
    content:
      "We chose Desire Realty for their reputation, and they delivered beyond promises. The quality of construction and attention to detail in our Home is remarkable.",
    rating: 5,
  },
  {
    name: "Manoj Kumar",
    role: "Investor, Smart City",
    image: "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1770271919/Manoj_kumar_jywhxy.png",
    content:
      "As a real estate investor, I value transparency and timely delivery. Desire Realty checks all boxes. My plot investment has already appreciated significantly.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-light font-medium text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3 mb-4">
            What Our Residents Say
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear from families who have made Desire Realty their trusted
            partner in finding their dream homes.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <Quote className="h-10 w-10 text-gold-light/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-light text-gold-light"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/80 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gold-light">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
