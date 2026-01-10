import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  projectName?: string;
}

const WhatsAppButton = ({ projectName }: WhatsAppButtonProps) => {
  const whatsappNumber = "919876543210";
  const defaultMessage = "Hi, I'm interested in learning more about Desire Realty projects. Please share details.";
  const projectMessage = projectName
    ? `Hi, I'm interested in ${projectName}. Please share more details.`
    : defaultMessage;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    projectMessage
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
    </motion.a>
  );
};

export default WhatsAppButton;
