import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using the Desire Realty website (desirerealty.in), you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, please do not use this website.",
      "These terms apply to all visitors, users, and enquirers who access or use our services.",
    ],
  },
  {
    title: "Website Use",
    content: [
      "You may use this website for lawful purposes only. You agree not to use it for any illegal, fraudulent, or harmful activity.",
      "You must not attempt to gain unauthorised access to any part of the website or its related systems.",
      "You agree not to submit false, misleading, or fraudulent enquiry information.",
      "Desire Realty reserves the right to restrict or terminate access to the website at its sole discretion.",
    ],
  },
  {
    title: "Property Information & Accuracy",
    content: [
      "All property details, pricing, specifications, and availability displayed on this website are indicative and subject to change without notice.",
      "Images and renders of projects are for representational purposes only. Actual developments may vary.",
      "Pricing is exclusive of applicable taxes, registration charges, and other statutory fees unless stated otherwise.",
      "Availability of specific plots or units should be confirmed directly with our sales team before making any decisions.",
    ],
  },
  {
    title: "RERA Disclaimer",
    content: [
      "Desire Realty is a RERA registered developer. RERA Registration No: RAJ/A/2026/17214.",
      "All project-related representations are subject to RERA regulations applicable in Rajasthan.",
      "Buyers are advised to independently verify all project details, approvals, and documents from the respective RERA authority before making any purchase decision.",
      "The RERA portal (rera.rajasthan.gov.in) should be consulted for official and updated project information.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on this website — including text, images, logos, layouts, and branding — is the intellectual property of Desire Realty or its licensors.",
      "You may not reproduce, distribute, republish, or create derivative works from any content without prior written permission.",
      "The Desire Realty name and logo are trademarks and may not be used without authorisation.",
    ],
  },
  {
    title: "Enquiries & Communications",
    content: [
      "By submitting an enquiry form, you consent to being contacted by our team via phone, email, or WhatsApp regarding your property interest.",
      "We are not liable for any decisions made based on information provided through our website without independent verification.",
      "Our team endeavours to respond to all genuine enquiries within 24 business hours.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "Desire Realty makes no warranties, expressed or implied, regarding the accuracy or completeness of the information on this website.",
      "We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.",
      "We are not responsible for the content of third-party websites linked from our site.",
      "The maximum liability of Desire Realty to any party shall not exceed the amount paid, if any, for using our services.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of India.",
      "Any disputes arising under these terms shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan.",
      "If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "For questions about these Terms of Service, please contact us:",
      "Email: sales@desirerealty.in",
      "Phone: +91 86194 21661",
      "Address: 111/14, Sector-11, Kumbha Marg, Pratap Nagar, Jaipur, Rajasthan 302033",
    ],
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Terms of Service — Desire Realty"
        description="Read Desire Realty's Terms of Service covering website use, property information, RERA compliance, intellectual property, and legal disclaimers."
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
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Terms of Service</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Please read these terms carefully before using the Desire Realty website or engaging
              with our services.
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
                <strong>Overview:</strong> These Terms of Service govern your use of the Desire
                Realty website and any related services offered by <strong>Desire Realty</strong>,
                registered at 111/14, Sector-11, Kumbha Marg, Pratap Nagar, Jaipur, Rajasthan
                302033. We reserve the right to update these terms at any time, with changes taking
                effect upon posting.
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
                <strong className="text-foreground">Amendments:</strong> Desire Realty reserves the
                right to modify these Terms of Service at any time. Changes are effective immediately
                upon posting to this website. Your continued use of the website following any changes
                constitutes your acceptance of the new terms.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
