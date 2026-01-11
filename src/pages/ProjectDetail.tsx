import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Building2,
  Maximize,
  Users,
  Layers,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EnquiryForm from "@/components/EnquiryForm";

const statusColors = {
  ongoing: "bg-emerald-600 text-white border-emerald-700 shadow-sm",
  completed: "bg-blue-600 text-white border-blue-700 shadow-sm",
  upcoming: "bg-amber-500 text-white border-amber-600 shadow-sm",
};

const amenityIcons: Record<string, string> = {
  "Swimming Pool": "🏊",
  "Gymnasium": "🏋️",
  "Clubhouse": "🏛️",
  "Children's Play Area": "🎢",
  "Landscaped Gardens": "🌳",
  "24/7 Security": "🔒",
  "Covered Parking": "🅿️",
  "Power Backup": "⚡",
  "Tennis Court": "🎾",
  "Jogging Track": "🏃",
  "Kids Play Zone": "🧒",
  "Community Hall": "🏠",
  "Landscaped Parks": "🌲",
  "Wide Internal Roads": "🛣️",
  "Underground Electricity": "💡",
  "Sewage Treatment": "♻️",
  "Water Supply": "💧",
  "Street Lighting": "🔦",
  "Gated Entry": "🚪",
  "Parks": "🌿",
  "Commercial Zone": "🏪",
  "Gym": "💪",
  "Co-working Space": "💼",
  "EV Charging": "🔌",
  "Smart Home Features": "📱",
  "Rooftop Deck": "🌅",
  "Pet Zone": "🐕",
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-serif text-primary mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/#projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappNumber = "919876543210";
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${project.name}. Please share more details.`
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge
                  className={`capitalize ${statusColors[project.status]}`}
                >
                  {project.status}
                </Badge>
                <span className="text-white/70 text-sm">{project.rera}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
                {project.name}
              </h1>

              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-5 w-5 text-gold-light" />
                <span className="text-lg">{project.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif text-primary mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif text-primary mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-xl p-5 text-center">
                    <Building2 className="h-8 w-8 text-accent mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="font-medium text-foreground">
                      {project.specifications.type}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-5 text-center">
                    <Maximize className="h-8 w-8 text-accent mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">Area</p>
                    <p className="font-medium text-foreground">
                      {project.specifications.area}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-5 text-center">
                    <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">Units</p>
                    <p className="font-medium text-foreground">
                      {project.specifications.units}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-5 text-center">
                    <Layers className="h-8 w-8 text-accent mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-1">Floors</p>
                    <p className="font-medium text-foreground">
                      {project.specifications.floors}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Key Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif text-primary mb-6">
                  Key Highlights
                </h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 bg-card rounded-lg p-4 shadow-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif text-primary mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-3xl mb-2 block">
                        {amenityIcons[amenity] || "✨"}
                      </span>
                      <span className="text-sm text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Location Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif text-primary mb-6">
                  Location
                </h2>
                <div className="rounded-xl overflow-hidden shadow-lg h-80">
                  <iframe
                    src={project.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${project.name} Location`}
                  />
                </div>
                <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{project.location}</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Sticky Enquiry Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-luxury"
                >
                  <p className="text-sm text-white/70 mb-1">Price</p>
                  <p className="text-2xl font-serif text-gold-light mb-4">
                    {project.price}
                  </p>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                      onClick={() => window.open("tel:+919876543210")}
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button
                      size="lg"
                      className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary gap-2"
                      onClick={() =>
                        document
                          .getElementById("enquiry-form")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Schedule Site Visit
                    </Button>
                    <Button
                      size="lg"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2 shadow-sm"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                          "_blank"
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </motion.div>

                {/* Enquiry Form */}
                <motion.div
                  id="enquiry-form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card rounded-2xl p-6 shadow-luxury"
                >
                  <h3 className="text-xl font-serif text-primary mb-2">
                    Enquire Now
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get pricing details & site visit schedule
                  </p>
                  <EnquiryForm selectedProject={project.id} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton projectName={project.name} />
    </div>
  );
};

export default ProjectDetail;
