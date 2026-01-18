import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/#projects" },
    { name: "About", path: "/#about" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Contact", path: "/#contact" },
  ];

  const scrollToSection = (path: string) => {
    // Always close mobile nav
    setIsOpen(false);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Desire Realty"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? "text-foreground" : "text-foreground"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.open("tel:+918619421661")}
            >
              <Phone className="h-4 w-4" />
              +91 86194 21661
            </Button>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => scrollToSection("/#contact")}
            >
              Schedule Site Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path)}
                  className="block w-full text-left py-3 text-foreground font-medium hover:text-accent transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open("tel:+918619421661")}
                >
                  <Phone className="h-4 w-4" />
                  +91 86194 21661
                </Button>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => scrollToSection("/#contact")}
                >
                  Schedule Site Visit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
