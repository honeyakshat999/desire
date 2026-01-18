import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                    +91 86194 21661
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
                    href="mailto:sales@desirerealty.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    sales@desirerealty.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Visit Our Office
                  </h3>
                  <p className="text-muted-foreground">
                    111/14, Sector-11, Kumbha Marg, Pratap Nagar
                    <br />
                    Jaipur, Rajasthan 302033
                  </p>
                </div>
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

            {/* Map */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985594257695!2d77.60959621482162!3d12.971598990854855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
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
