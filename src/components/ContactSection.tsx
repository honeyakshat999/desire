import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ReraLink } from "@/components/ReraLink";
import { Button } from "@/components/ui/button";
import { branches } from "@/data/branches";
import EnquiryForm from "./EnquiryForm";

const ContactSection = () => {
  const whatsappNumber = "918619421661";
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in learning more about Desire Realty projects. Please share details."
  );

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium text-sm tracking-wider uppercase">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mt-3 mb-6">
              Let's Find Your Dream Home
            </h2>
            <p className="text-muted-foreground mb-8">
              Ready to take the next step? Our expert team is here to guide you
              through every stage of your property journey.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Call Us</h3>
                  <a
                    href="tel:+918619421661"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    +918619421661
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email Us</h3>
                  <a
                    href="mailto:sales@desirerealty.in"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    sales@desirerealty.in
                  </a>
                </div>
              </div>

              {branches.map((branch) => (
                <div key={branch.id} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {branch.label}
                    </h3>
                    <p className="text-muted-foreground">
                      {branch.street}
                      <br />
                      {branch.cityLine}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                <p className="text-sm font-medium text-foreground">
                  RERA No: <ReraLink />
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
                  "_blank"
                )
              }
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>

            {/* Maps */}
            <div className="mt-8 space-y-4">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="rounded-xl overflow-hidden shadow-lg h-56"
                >
                  <iframe
                    src={branch.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${branch.label} Location`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-luxury"
          >
            <h3 className="text-2xl font-serif text-primary mb-2">
              Schedule a Site Visit
            </h3>
            <p className="text-muted-foreground mb-6">
              Fill in your details and our team will get back to you within 24
              hours.
            </p>
            <EnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
