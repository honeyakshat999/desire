import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email address, phone number) when you submit an enquiry or contact form.",
      "Property preferences and requirements you share when requesting information about our projects.",
      "Technical data including IP address, browser type, and pages visited — collected automatically through cookies and analytics tools.",
      "Communication records when you contact us via phone, email, or WhatsApp.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To respond to your property enquiries and provide information about our projects.",
      "To schedule site visits and follow up on your interest in our developments.",
      "To send you relevant updates about new launches, offers, and real estate news (only if you opt in).",
      "To improve our website experience and understand how visitors interact with our content.",
      "To comply with legal obligations under RERA and applicable Indian laws.",
    ],
  },
  {
    title: "Cookies & Tracking",
    content: [
      "Our website uses cookies to enhance your browsing experience and collect analytical data.",
      "We use Google Analytics to understand website traffic patterns. This data is anonymised and aggregated.",
      "You may disable cookies through your browser settings; however, some features of the site may not function correctly.",
      "We do not use tracking cookies for advertising profiling or sell your data to third parties.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share your information with our banking partners (SBI, HDFC, ICICI, Axis, LIC HFL) only with your explicit consent for home loan processing.",
      "We may disclose information if required by law, court order, or government authority.",
      "Our website may use trusted third-party service providers (e.g. form services, hosting) who are bound by confidentiality agreements.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement appropriate technical and organisational measures to safeguard your personal data.",
      "All form submissions on our website are transmitted over HTTPS encrypted connections.",
      "Access to your data is restricted to authorised personnel only, on a need-to-know basis.",
      "We retain your data only for as long as necessary to fulfil the purposes outlined in this policy or as required by law.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to access the personal information we hold about you.",
      "You may request correction of inaccurate or incomplete data.",
      "You may request deletion of your personal data, subject to our legal obligations.",
      "You may opt out of marketing communications at any time by contacting us at sales@desirerealty.in.",
    ],
  },
  {
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party websites (e.g. RERA portal, bank websites). We are not responsible for their privacy practices.",
      "We encourage you to review the privacy policies of any external websites you visit.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "For any questions or concerns about this Privacy Policy or your personal data, please contact us:",
      "Email: sales@desirerealty.in",
      "Phone: +91 86194 21661",
      "Address: 111/14, Sector-11, Kumbha Marg, Pratap Nagar, Jaipur, Rajasthan 302033",
    ],
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Privacy Policy — Desire Realty"
        description="Desire Realty's Privacy Policy explains how we collect, use, and protect your personal information. Read our commitment to your data privacy."
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
            <Badge className="mb-4 bg-accent text-accent-foreground">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Privacy Policy</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how Desire Realty collects, uses, and protects your personal information.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-white/50 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Last updated: March 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-10"
            >
              <p className="text-foreground text-sm leading-relaxed">
                <strong>Introduction:</strong> Desire Realty ("we", "our", or "us") is committed to
                protecting and respecting your privacy. This Privacy Policy applies to all personal
                information collected through our website <strong>desirerealty.in</strong>, enquiry
                forms, and communications. By using our website, you consent to the practices
                described herein.
              </p>
            </motion.div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-serif text-primary mb-4 pb-2 border-b border-border">
                    {index + 1}. {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 bg-primary/5 rounded-xl border border-border"
            >
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">Changes to This Policy:</strong> We may update
                this Privacy Policy from time to time. Any changes will be posted on this page with a
                revised date. We encourage you to review this policy periodically. Continued use of
                our website after changes constitutes acceptance of the updated policy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
