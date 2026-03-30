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
import { SEOHead } from "@/components/SEOHead";
import FAQ from "@/components/FAQ";

const Index = () => {
  // Track page view
  usePageView();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="RERA Approved Plots & Apartments in Jaipur"
        description="Desire Realty — RERA registered developer in Jaipur. 5 active projects in Vaishali Nagar, Jagatpura & Chaksu. SBI/HDFC approved. RERA: RAJ/A/2026/17214."
      />
      <Navbar />
      <Hero />
      <ProjectsSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <StickyEnquiryCTA />
    </div>
  );
};

export default Index;
