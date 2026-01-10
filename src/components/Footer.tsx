import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logo}
              alt="Desire Realty"
              className="h-16 w-auto mb-4 bg-white rounded-lg p-2"
            />
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Crafting landmark living spaces with over 15 years of trust and
              excellence in real estate development.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/#projects" },
                { name: "About Us", path: "/#about" },
                { name: "Testimonials", path: "/#testimonials" },
                { name: "Contact", path: "/#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-gold-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-serif text-lg mb-4">Our Projects</h3>
            <ul className="space-y-3">
              {[
                { name: "Desire Heights", id: "desire-heights" },
                { name: "Desire Villa Gardens", id: "desire-villa-gardens" },
                { name: "Desire Greens", id: "desire-greens" },
                { name: "Desire Urbania", id: "desire-urbania" },
              ].map((project, index) => (
                <li key={index}>
                  <Link
                    to={`/project/${project.id}`}
                    className="text-white/70 hover:text-gold-light transition-colors text-sm"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-light flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  123, Business Tower, MG Road
                  <br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-light" />
                <a
                  href="tel:+919876543210"
                  className="text-white/70 hover:text-gold-light transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-light" />
                <a
                  href="mailto:sales@desirerealty.com"
                  className="text-white/70 hover:text-gold-light transition-colors text-sm"
                >
                  sales@desirerealty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} Desire Realty. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-white/50 hover:text-gold-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-white/50 hover:text-gold-light transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center mt-4">
            RERA Disclaimer: All projects are RERA registered. Buyers are
            advised to verify all details independently before making any
            purchase decision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
