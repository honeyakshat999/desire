import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects } from "@/data/projects";
import { useToast } from "@/hooks/use-toast";
import { trackEnquiryClick } from "@/hooks/useAnalytics";

interface EnquiryFormProps {
  selectedProject?: string;
  onSuccess?: () => void;
}

const EnquiryForm = ({ selectedProject, onSuccess }: EnquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    project: selectedProject || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track enquiry click
    const selectedProjectData = projects.find(p => p.name === formData.project);
    trackEnquiryClick(
      selectedProjectData?.id || "general",
      formData.project || "General Enquiry",
      "enquiry_form"
    );

    try {
      // Save to database via Netlify function
      const response = await fetch("/.netlify/functions/submit-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          project: formData.project,
          message: formData.message || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Server error:', errorData);
        throw new Error(errorData.error || errorData.details || "Failed to submit enquiry");
      }

      const result = await response.json();
      console.log('Success:', result);
      
      setIsSubmitted(true);
      onSuccess?.();
      
      toast({
        title: "Enquiry Submitted!",
        description: "Our sales team will contact you shortly.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Something went wrong",
        description: errorMessage || "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-serif text-primary mb-2">
          Thank You for Your Interest!
        </h3>
        <p className="text-muted-foreground">
          Our sales team will contact you shortly to assist with your enquiry.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="bg-background"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Mobile Number *"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            className="bg-background"
          />
        </div>
      </div>

      <Select
        value={formData.project}
        onValueChange={(value) =>
          setFormData({ ...formData, project: value })
        }
      >
        <SelectTrigger className="bg-background">
          <SelectValue placeholder="Interested Projects (Optional)" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
          <SelectItem value="general">General Enquiry</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Your Message (Optional)"
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.target.value })
        }
        rows={3}
        className="bg-background"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Enquiry
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our Privacy Policy and consent to be
        contacted by our team.
      </p>
    </form>
  );
};

export default EnquiryForm;
