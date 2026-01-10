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
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

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
    email: "",
    project: selectedProject || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase.from("enquiries").insert({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        project: formData.project,
        message: formData.message || null,
      });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-enquiry-email",
        {
          body: {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            project: formData.project,
            message: formData.message,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the form if email fails, enquiry is saved
      }

      setIsSubmitted(true);
      onSuccess?.();
      
      toast({
        title: "Enquiry Submitted!",
        description: "Our sales team will contact you shortly.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="bg-background"
          />
        </div>
        <div>
          <Select
            value={formData.project}
            onValueChange={(value) =>
              setFormData({ ...formData, project: value })
            }
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Interested Project *" />
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
        </div>
      </div>

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
