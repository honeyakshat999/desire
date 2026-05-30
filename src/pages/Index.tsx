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
        title="JDA & RERA Approved Plots in Jaipur"
        description="JDA & RERA approved developer in Jaipur. 6 projects — plots & apartments across Vaishali Nagar, Jagatpura, Ajmer Road & Chaksu. SBI/HDFC approved."
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
