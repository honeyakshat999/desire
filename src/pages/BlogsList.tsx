import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { usePageView } from "@/hooks/useAnalytics";
import { SEOHead } from "@/components/SEOHead";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  created_at: string;
}

const BlogsList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track page view
  usePageView();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    // Static snapshot first so react-snap prerenders the list for SSG/SEO;
    // the live API call then refreshes it after hydration.
    let loaded = false;
    try {
      const snap = await fetch("/blog-data/index.json");
      if (snap.ok) {
        const data = await snap.json();
        setBlogs(data.blogs);
        setIsLoading(false);
        loaded = true;
      }
    } catch {
      // no snapshot — fall through to live API
    }

    try {
      const response = await fetch("/.netlify/functions/blogs-api");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
      } else if (!loaded) {
        setError("Failed to load blogs");
      }
    } catch (err) {
      if (!loaded) setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Real Estate Blog — Jaipur Property Insights"
        description="Latest real estate trends, investment tips, and property updates from Desire Realty. Stay informed about Jaipur's residential market."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground">Our Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Insights & Updates
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Stay informed with the latest real estate trends, investment tips, and updates from Desire Realty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-luxury transition-all duration-300 h-full">
                      {/* Cover Image */}
                      <div className="aspect-video overflow-hidden bg-muted">
                        {blog.cover_image ? (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            width="600"
                            height="338"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                            <span className="text-4xl font-serif text-primary/20">
                              {blog.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-serif text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {blog.excerpt || "Read more about this topic..."}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsList;
