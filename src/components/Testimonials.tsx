import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner, Desire Heights",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "The entire experience with Desire Realty was exceptional. From site visits to possession, their team was professional and transparent. Our new home exceeds all expectations.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Villa Owner, Desire Villa Gardens",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "We chose Desire Realty for their reputation, and they delivered beyond promises. The quality of construction and attention to detail in our villa is remarkable.",
    rating: 5,
  },
  {
    name: "Anand Mehta",
    role: "Investor, Desire Greens",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
