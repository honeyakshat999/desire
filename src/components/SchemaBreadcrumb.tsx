import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface SchemaBreadcrumbProps {
  items: BreadcrumbItem[];
}

const BASE_URL = "https://desirerealty.in";

export const SchemaBreadcrumb = ({ items }: SchemaBreadcrumbProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-white/70">
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
            {index === items.length - 1 ? (
              <span className="text-white/90 truncate max-w-[200px]">{item.name}</span>
            ) : (
              <Link to={item.href} className="hover:text-white transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};
