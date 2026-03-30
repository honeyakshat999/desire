import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "Are Desire Realty projects RERA registered?",
    answer:
      "Yes. All our projects are RERA registered with the Rajasthan Real Estate Regulatory Authority. Our RERA number is RAJ/A/2026/17214. You can verify this at rera.rajasthan.gov.in.",
  },
  {
    question: "Which banks have approved Desire Realty projects for home loans?",
    answer:
      "Our projects are approved by SBI, HDFC Bank, ICICI Bank, Axis Bank, and LIC Housing Finance, making it easy to secure a home loan at competitive interest rates.",
  },
  {
    question: "Where are your projects located in Jaipur?",
    answer:
      "We have projects across key locations in Jaipur including Vaishali Nagar (Gandhi Path West), Jagatpura (200 FT Road), Chaksu on NH-8, and Pratap Nagar. Each location is chosen for strong connectivity and growth potential.",
  },
  {
    question: "What types of properties does Desire Realty offer?",
    answer:
      "We offer a range of properties including residential plots, 3 & 4 BHK luxury apartments, farmhouses, and mixed-use commercial-residential developments.",
  },
  {
    question: "How can I schedule a site visit?",
    answer:
      "You can schedule a site visit by calling us at +91 86194 21661, emailing sales@desirerealty.in, or filling the enquiry form on our website. Our team will arrange a visit at your convenience.",
  },
  {
    question: "What is the starting price for properties at Desire Realty?",
    answer:
      "Prices vary by project and configuration. Our apartments start from ₹80 Lakh onwards. Contact us for the latest pricing and special offers on specific projects.",
  },
  {
    question: "Does Desire Realty offer payment plans?",
    answer:
      "Yes, we offer flexible payment plans and construction-linked payment options. Our sales team can walk you through the available plans for each project.",
  },
  {
    question: "How many years of experience does Desire Realty have?",
    answer:
      "Desire Realty has been building trust since 2015 — over 10 years of experience delivering premium residential and commercial spaces in Jaipur. We have completed 10 projects and delivered 1M+ sq.ft. to 500+ happy families.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about buying a property with Desire Realty.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-accent flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
