import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  ZoomIn,
  Clock,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EnquiryForm from "@/components/EnquiryForm";
import { usePageView } from "@/hooks/useAnalytics";

const statusColors = {
  ongoing: "bg-emerald-600 text-white border-emerald-700 shadow-sm",
  completed: "bg-blue-600 text-white border-blue-700 shadow-sm",
  upcoming: "bg-amber-500 text-white border-amber-600 shadow-sm",
};

const amenityIcons: Record<string, string> = {
  "Swimming Pool": "🏊",
  "Gymnasium": "🏋️",
  "Clubhouse": "🏛️",
  "Children's Play Area": "🛝",
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
  "Underground Electricity / Water Lines": "💡",
  "Gated Township": "🏘️",
  "Park / Children Play area": "🎾",
  "Temple": "🛕",
  "RERA Approved": "✅",
  "Green & Open Spaces": "🌳",
  "Plot Demarcation": "📍",
  "Mini Theater": "🎭",
  "Terrace Garden": "🌺",
  "Gazebo": "🛖",
  "Water Harvesting": "💧",
  "Smart Featured Lifts system": "🛗",
  "CCTV Surveillance": "📹",
  "Fire Safety Systems": "🚒",
  "Underground Electricity Lines": "💡",
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [showOverlay, setShowOverlay] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = React.useRef(0);

  // Track page view
  usePageView();

  // Track current slide
  React.useEffect(() => {
    if (!api) return;
    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!lightboxOpen || !project) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const allImages = project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image];
      
      if (e.key === 'ArrowLeft') {
        setSlideDirection(-1);
        setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setSlideDirection(1);
        setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
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

  // Coming Soon Page for projects under construction
  if (project.comingSoon) {
    const whatsappNumber = "918619421661";
    const whatsappMessage = encodeURIComponent(
      `Hi, I'm interested in ${project.name}. Please notify me when it launches.`
    );

    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-navy-dark/40" />
          
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
                  <Badge className="bg-amber-500 text-white border-amber-600 shadow-sm">
                    Coming Soon
                  </Badge>
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

        {/* Coming Soon Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 mb-8">
                  <Clock className="h-12 w-12 text-amber-600" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                  Something Extraordinary is Coming
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.name} is currently under development. We're working hard to bring you 
                  an exceptional living experience. Stay tuned for updates on this exciting new project.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {project.highlights.map((highlight, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-4 py-2 text-sm border-accent text-accent"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Get Notified Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-luxury"
              >
                <Bell className="h-10 w-10 text-gold-light mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-white mb-3">
                  Be the First to Know
                </h3>
                <p className="text-white/70 mb-6">
                  Register your interest now and get exclusive updates about launch date, 
                  pricing, and early-bird offers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                    onClick={() => window.open("tel:+918619421661")}
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                        "_blank"
                      )
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </Button>
                </div>
              </motion.div>

              {/* Back to Projects */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <Link to="/#projects">
                  <Button variant="outline" size="lg" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Explore Other Projects
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton projectName={project.name} />
      </div>
    );
  }

  const whatsappNumber = "918619421661";
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${project.name}. Please share more details.`
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }} setApi={setApi}>
          <CarouselContent className="h-[60vh] min-h-[400px] ml-0">
            {(project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image]).map((img, index) => (
              <CarouselItem key={index} className="pl-0 basis-full">
                <div
                  className="relative w-full h-[60vh] min-h-[400px] cursor-pointer group"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`${project.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                  {/* Click hint - always visible */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 pointer-events-none">
                    <ZoomIn className="h-4 w-4" />
                    View Fullscreen
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Dot indicators at bottom */}
          {project.gallery.length > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {[project.image, ...project.gallery].map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    api?.scrollTo(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'}`}
                />
              ))}
            </div>
          )}
        </Carousel>

        {/* Gradient overlay - only show when showOverlay is true */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent pointer-events-none transition-opacity duration-300" />
        )}

        {/* Close button when overlay is hidden */}
        {!showOverlay && (
          <button
            onClick={() => setShowOverlay(true)}
            className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full z-30 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        {/* Project info overlay - only show when showOverlay is true */}
        {showOverlay && (
          <div className="absolute inset-0 flex items-end pointer-events-none transition-opacity duration-300">
            <div className="container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/#projects"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors pointer-events-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </Link>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge className={`capitalize ${statusColors[project.status]}`}>
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
        )}
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
                      onClick={() => window.open("tel:+918619421661")}
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


      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 bg-white text-black p-3 rounded-full z-[110] transition-colors hover:bg-gray-200 shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image container with swipe and drag support */}
          <div 
            className="relative w-full flex-1 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as any).startX = touch.clientX;
              setIsSwiping(true);
            }}
            onTouchMove={(e) => {
              if (!isSwiping) return;
              const touch = e.touches[0];
              const startX = (e.currentTarget as any).startX;
              const diff = touch.clientX - startX;
              setSwipeOffset(diff);
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const startX = (e.currentTarget as any).startX;
              const diff = touch.clientX - startX;
              const allImages = project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image];
              
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  // Swipe right - go to previous
                  setSlideDirection(-1);
                  setCurrentImageIndex(currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1);
                } else {
                  // Swipe left - go to next
                  setSlideDirection(1);
                  setCurrentImageIndex(currentImageIndex === allImages.length - 1 ? 0 : currentImageIndex + 1);
                }
              }
              setSwipeOffset(0);
              setIsSwiping(false);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              dragStartX.current = e.clientX;
              setIsDragging(true);
              setIsSwiping(true);
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              const diff = e.clientX - dragStartX.current;
              setSwipeOffset(diff);
            }}
            onMouseUp={(e) => {
              if (!isDragging) return;
              const diff = e.clientX - dragStartX.current;
              const allImages = project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image];
              
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  setSlideDirection(-1);
                  setCurrentImageIndex(currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1);
                } else {
                  setSlideDirection(1);
                  setCurrentImageIndex(currentImageIndex === allImages.length - 1 ? 0 : currentImageIndex + 1);
                }
              }
              setSwipeOffset(0);
              setIsDragging(false);
              setIsSwiping(false);
            }}
            onMouseLeave={() => {
              if (isDragging) {
                setSwipeOffset(0);
                setIsDragging(false);
                setIsSwiping(false);
              }
            }}
          >
            <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={(project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image])[currentImageIndex]}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none p-4"
                draggable={false}
                custom={slideDirection}
                initial={{ x: slideDirection > 0 ? 300 : -300, opacity: 0 }}
                animate={{ 
                  x: swipeOffset, 
                  opacity: 1,
                  transition: { 
                    x: { type: isSwiping ? 'tween' : 'spring', stiffness: 120, damping: 20, duration: isSwiping ? 0 : 0.5 },
                    opacity: { duration: 0.4, ease: 'easeOut' }
                  }
                }}
                exit={{ 
                  x: slideDirection > 0 ? -300 : 300, 
                  opacity: 0,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
              />
            </AnimatePresence>
          </div>

          {/* Dot indicators at bottom */}
          {(project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image]).length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-[110] bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
              {(project.gallery.length > 0 ? [project.image, ...project.gallery] : [project.image]).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideDirection(idx > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all border-2 ${idx === currentImageIndex ? 'bg-white border-white scale-125' : 'bg-transparent border-white/70 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
      <WhatsAppButton projectName={project.name} />
    </div>
  );
};

export default ProjectDetail;


