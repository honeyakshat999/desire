import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (path: string) => {
    // Home should scroll to top
    if (path === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Section links like /#projects
    if (path.startsWith("/#")) {
      const sectionId = path.replace("/#", "");
      const doScroll = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(doScroll, 80);
      } else {
        doScroll();
      }
    }
  };

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
              Crafting premium land, farmhouses, and residential living spaces with 10 years of trusted real estate expertise.
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
                { name: "Blog", path: "/blogs" },
                { name: "Contact", path: "/#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (link.path.startsWith("/#")) {
                        scrollToSection(link.path);
                      } else {
                        navigate(link.path);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="text-white/70 hover:text-gold-light transition-colors text-sm cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-serif text-lg mb-4">Our Projects</h3>
            <ul className="space-y-3">
              {[
                { name: "Brajeshwar Avenue", id: "brajeshwar-avenue" },
                { name: "Ganesh Vihar", id: "ganesh-vihar" },
                { name: "Kesar Bagh", id: "kesar-bagh" },
                { name: "Smart City", id: "smart-city" },
                { name: "Brajeshwar Crown", id: "brajeshwar-crown" },
              ].map((project, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(`/project/${project.id}`);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
                    }}
                    className="text-white/70 hover:text-gold-light transition-colors text-sm cursor-pointer text-left"
                  >
                    {project.name}
                  </button>
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
                  111/14, Sector-11, Kumbha Marg, Pratap Nagar
                  <br />
                  Jaipur, Rajasthan 302033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-light" />
                <a
                  href="tel:+918619421661"
                  className="text-white/70 hover:text-gold-light transition-colors text-sm"
                >
                  +91 86194 21661
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-light" />
                <a
                  href="mailto:sales@desirerealty.in"
                  className="text-white/70 hover:text-gold-light transition-colors text-sm"
                >
                  sales@desirerealty.in
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

      {/* Developer Credit Bar - extra padding on mobile for sticky CTA */}
      <div className="bg-black/30 py-4 pb-20 md:pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/60 text-xs text-center md:text-left">
              Designed & Developed by{" "}
              <a
                href="https://kyleinnovate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light hover:text-gold transition-colors font-medium"
              >
                KyleInnovate
              </a>{" "}
              | All Rights Reserved © {currentYear}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://kyleinnovate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold-light transition-colors text-xs"
              >
                kyleinnovate.com
              </a>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/kyleinnovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-light transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/kyleinnovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-light transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com/kyleinnovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-light transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/company/kyleinnovate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-light transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
