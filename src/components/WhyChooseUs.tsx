import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  Shield,
  Clock,
  HeartHandshake,
} from "lucide-react";
import sbiLogo from "@/assets/banks/https://res.cloudinary.com/ddnjyktnc/image/upload/v1771482821/Desire-Realty-website-images/src/assets/banks/sbi.png";
import hdfcLogo from "@/assets/banks/https://res.cloudinary.com/ddnjyktnc/image/upload/v1771482823/Desire-Realty-website-images/src/assets/banks/hdfc.jpg";
import iciciLogo from "@/assets/banks/https://res.cloudinary.com/ddnjyktnc/image/upload/v1771482822/Desire-Realty-website-images/src/assets/banks/icici.jpg";
import axisLogo from "@/assets/banks/https://res.cloudinary.com/ddnjyktnc/image/upload/v1771482824/Desire-Realty-website-images/src/assets/banks/axis.jpg";
import licLogo from "@/assets/banks/https://res.cloudinary.com/ddnjyktnc/image/upload/v1771482825/Desire-Realty-website-images/src/assets/banks/LIC.png";

const stats = [
  {
    icon: Clock,
    value: "10+",
    label: "Years of Excellence",
    description: "Building trust since 2015",
  },
  {
    icon: Building2,
    value: "1M+",
    label: "Sq.Ft. Delivered",
    description: "Premium spaces crafted",
  },
  {
    icon: Users,
    value: "500+",
    label: "Happy Families",
    description: "Dreams turned to reality",
  },
  {
    icon: Award,
    value: "10",
    label: "Projects Completed",
    description: "Landmark developments",
  },
];

const values = [
  {
    icon: Shield,
    title: "RERA Compliant",
    description:
      "All projects are registered and compliant with RERA regulations for your peace of mind.RERA No: RAJ/A/2026/17214",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Dealings",
    description:
      "Clear documentation, honest pricing, and no hidden costs throughout your journey.",
  },
  {
    icon: Building2,
    title: "Quality Construction",
    description:
      "Premium materials, skilled craftsmanship, and rigorous quality checks at every stage.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm tracking-wider uppercase">
            Why Desire Realty
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary mt-3 mb-4">
            Building Trust, Delivering Dreams
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a developer who values your aspirations as much as you do.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-luxury transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-full mb-4">
                <stat.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-serif text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                  <value.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Banks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-border"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Approved by leading financial institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: "SBI", logo: sbiLogo },
              { name: "HDFC Bank", logo: hdfcLogo },
              { name: "ICICI Bank", logo: iciciLogo },
              { name: "Axis Bank", logo: axisLogo },
              { name: "LIC Housing Finance", logo: licLogo },
            ].map((bank) => (
              <div
                key={bank.name}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
