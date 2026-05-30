import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
const logo = "https://res.cloudinary.com/ddnjyktnc/image/upload/f_auto,q_auto/v1771482813/Desire-Realty-website-images/src/assets/test_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Pages with dark hero backgrounds that need light navbar text
  const hasDarkHero = location.pathname === "/" || location.pathname.startsWith("/blogs") || location.pathname.startsWith("/admin") || location.pathname.startsWith("/project") || location.pathname === "/about" || location.pathname === "/privacy" || location.pathname === "/terms";

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
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Blog", path: "/blogs" },
    { name: "Contact", path: "/#contact" },
  ];

  const scrollToSection = (path: string) => {
    // Close mobile nav first
    setIsOpen(false);

    // Use a timeout to allow the mobile menu to close before scrolling
    // This fixes touch event issues on mobile devices
    const performNavigation = () => {
      // Home should scroll to top
      if (path === "/") {
        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      // Regular page navigation (like /blogs)
      if (!path.startsWith("/#")) {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Section links like /#projects
      if (path.startsWith("/#")) {
        const sectionId = path.replace("/#", "");
        const doScroll = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            // Calculate offset for fixed navbar
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        };

        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(doScroll, 150);
        } else {
          doScroll();
        }
      }
    };

    // Delay navigation on mobile to ensure menu closes properly
    setTimeout(performNavigation, 50);
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
              className="h-14 w-auto object-contain lg:h-20 lg:w-auto"
              width="120"
              height="80"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.path);
                }}
                className={`text-sm font-semibold transition-colors ${
                  isScrolled
                    ? "text-primary hover:text-accent"
                    : hasDarkHero
                      ? "text-white hover:text-white/80 drop-shadow-sm"
                      : "text-primary hover:text-accent"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${!isScrolled && hasDarkHero ? "text-white hover:text-white/80 hover:bg-white/10" : ""}`}
              onClick={() => window.open("tel:+918619421661")}
            >
              <Phone className="h-4 w-4" />
              +918619421661
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
            className="lg:hidden p-2 z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className={`h-6 w-6 ${!isScrolled && hasDarkHero ? "text-white" : "text-foreground"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
            style={{ top: "80px" }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t relative z-50"
            style={{ touchAction: "pan-y" }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection(link.path);
                  }}
                  className="block w-full text-left py-4 text-foreground font-medium hover:text-accent active:text-accent transition-colors cursor-pointer select-none"
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open("tel:+918619421661")}
                >
                  <Phone className="h-4 w-4" />
                  +918619421661
                </Button>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("/#contact");
                  }}
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
