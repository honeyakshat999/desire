import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusColors = {
  ongoing: "bg-emerald-600 text-white border-emerald-700 shadow-sm",
  completed: "bg-blue-600 text-white border-blue-700 shadow-sm",
  upcoming: "bg-amber-500 text-white border-amber-600 shadow-sm",
};

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-luxury transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
        
        {/* Status Badge */}
        <Badge
          className={`absolute top-4 left-4 capitalize ${statusColors[project.status]}`}
        >
          {project.status}
        </Badge>

        {/* Quick View on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/project/${project.id}`}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            >
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-serif text-primary group-hover:text-accent transition-colors">
            {project.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 text-accent" />
          <span className="text-sm">{project.location}</span>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <p className="text-lg font-semibold text-primary">{project.price}</p>
          </div>
          <Link to={`/project/${project.id}`}>
            <Button
              variant="ghost"
              className="text-accent hover:text-accent hover:bg-accent/10 gap-2"
            >
              Details
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
