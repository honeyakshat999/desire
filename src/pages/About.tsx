import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyEnquiryCTA from "@/components/StickyEnquiryCTA";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Award,
  Clock,
  Shield,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Target,
  Eye,
} from "lucide-react";

const stats = [
  { icon: Clock, value: "10+", label: "Years of Excellence", description: "Building trust since 2015" },
  { icon: Building2, value: "1M+", label: "Sq.Ft. Delivered", description: "Premium spaces crafted" },
  { icon: Users, value: "500+", label: "Happy Families", description: "Dreams turned to reality" },
  { icon: Award, value: "10", label: "Projects Completed", description: "Landmark developments" },
];

const values = [
  {
    icon: Shield,
    title: "RERA & JDA Approved",
    description:
      "All our projects are RERA registered (RAJ/A/2026/17214) and JDA approved, ensuring complete transparency and buyer protection at every step.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Dealings",
    description:
      "Clear documentation, honest pricing, and no hidden costs. We believe every buyer deserves full clarity before signing anything.",
  },
  {
    icon: Building2,
    title: "Quality Construction",
    description:
      "Premium materials, skilled craftsmanship, and rigorous quality checks at every stage of development.",
  },
  {
    icon: CheckCircle2,
    title: "Bank Approved",
    description:
      "Our projects are approved by SBI, HDFC, ICICI, Axis Bank, and LIC Housing Finance for seamless home loan processing.",
  },
  {
    icon: Target,
    title: "Prime Locations",
    description:
      "Strategically located projects across Jaipur's key growth corridors — Vaishali Nagar, Jagatpura, and Chaksu.",
  },
  {
    icon: Award,
    title: "Award-Winning Legacy",
    description:
      "Over a decade of delivering premium residential spaces with a reputation built entirely on trust and excellence.",
  },
];

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="About Us — Desire Realty | Jaipur's Trusted Real Estate Developer"
        description="Learn about Desire Realty's 10+ year legacy of building premium plots, farmhouses, and residential spaces in Jaipur. RERA registered. 500+ happy families."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Building Trust, Delivering Dreams
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Over a decade of crafting premium land, farmhouses, and residential living spaces in Jaipur — with honesty, quality, and heart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-medium text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-primary mt-3 mb-6">
                A Decade of Premium Real Estate in Jaipur
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2015, Desire Realty has been at the forefront of Jaipur's real estate transformation. What started as a vision to make quality land ownership accessible has grown into one of the city's most trusted property development firms.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We specialize in premium residential plots, farmhouses, and developed living spaces across Jaipur's key growth corridors — Vaishali Nagar, Jagatpura, and Chaksu. Every project reflects our commitment to thoughtful planning, legal clarity, and lasting value.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With over 1 million sq. ft. delivered and 500+ families served, our legacy is built on one simple promise: doing right by our buyers — every single time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-luxury transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-3xl font-serif text-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mb-0.5">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mt-3">
              Mission & Vision
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-accent"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make premium real estate accessible to every aspiring homeowner in Jaipur — through transparent processes, RERA compliance, and unwavering quality standards that protect and reward our buyers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 shadow-lg border-l-4 border-primary"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be Rajasthan's most trusted real estate developer — creating landmark communities that stand as enduring symbols of quality, integrity, and thoughtful urban living for generations to come.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mt-3 mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by principles that put our buyers first.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                  <value.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-primary mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Visit our office or schedule a free site visit — our team is here to help you make the right investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleContactClick}
              >
                Schedule Site Visit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => window.open("tel:+918619421661")}
              >
                <Phone className="h-4 w-4 mr-2" />
                +91 86194 21661
              </Button>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                111/14, Sector-11, Pratap Nagar, Jaipur 302033
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                sales@desirerealty.in
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <StickyEnquiryCTA />
    </div>
  );
};

export default About;
