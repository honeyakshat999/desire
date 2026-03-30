import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ReraLink } from "@/components/ReraLink";
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

            {/* Map */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2018440606857!2d75.82188627511756!3d26.801700964853058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9940991979f%3A0x20c215a9012762a4!2s143%2F111%2C%20Sector%2011%20Rd%2C%20Kumbha%20Marg%2C%20Sanganer%2C%20Sector%2011%2C%20Pratap%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302033!5e0!3m2!1sen!2sin!4v1768761364202!5m2!1sen!2sin"
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
