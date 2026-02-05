import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EnquiryForm from "./EnquiryForm";

const StickyEnquiryCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary shadow-lg border-t border-gold/20 md:hidden pb-[env(safe-area-inset-bottom)]"
          >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="text-white text-sm">
                <span className="font-medium">Interested?</span>
                <span className="text-white/70 ml-1">Get a callback</span>
              </div>
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                onClick={() => setIsOpen(true)}
              >
                <Calendar className="h-4 w-4" />
                Book Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold gap-2 rotate-[-90deg] origin-right"
              onClick={() => setIsOpen(true)}
            >
              <Calendar className="h-4 w-4 rotate-90" />
              Book Site Visit
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-primary">
              Schedule a Site Visit
            </DialogTitle>
          </DialogHeader>
          <EnquiryForm onSuccess={() => setTimeout(() => setIsOpen(false), 2000)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StickyEnquiryCTA;
