import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyEnquiryCTA from "@/components/StickyEnquiryCTA";
import { usePageView } from "@/hooks/useAnalytics";

const Index = () => {
  // Track page view
  usePageView();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <StickyEnquiryCTA />
    </div>
  );
};

export default Index;
