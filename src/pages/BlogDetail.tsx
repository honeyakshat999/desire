import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, ArrowLeft, Clock } from "lucide-react";
import { usePageView } from "@/hooks/useAnalytics";

// Allowed domains for images and iframes in blog content
const ALLOWED_IMAGE_DOMAINS = ["res.cloudinary.com"];
const ALLOWED_IFRAME_DOMAINS = ["www.google.com", "www.youtube.com", "youtube.com", "player.vimeo.com"];

// Configure DOMPurify to restrict external resources
DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
  if (data.attrName === "src") {
    try {
      const url = new URL(data.attrValue);
      const tag = node.tagName.toLowerCase();
      if (tag === "img" && !ALLOWED_IMAGE_DOMAINS.includes(url.hostname)) {
        data.attrValue = "";
        node.setAttribute("alt", "[External image blocked]");
      } else if (tag === "iframe" && !ALLOWED_IFRAME_DOMAINS.includes(url.hostname)) {
        data.attrValue = "";
      }
    } catch {
      // Relative URLs or invalid URLs — allow relative, block invalid
      if (data.attrValue.startsWith("http")) {
        data.attrValue = "";
      }
    }
  }
});

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  published_at: string;
  created_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track page view
  usePageView();

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/.netlify/functions/blogs-api/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data.blog);
      } else {
        setError("Blog not found");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-3xl font-serif text-primary mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/70">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getReadingTime(blog.content)} min read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {blog.cover_image && (
        <section className="relative -mt-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-luxury">
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div
              className="blog-content"
              style={{
                fontSize: '16px',
                lineHeight: '1.75',
                color: 'hsl(var(--foreground))'
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'] }) }}
            />
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mt-16 p-8 bg-muted rounded-xl text-center"
          >
            <h3 className="text-2xl font-serif text-primary mb-4">
              Interested in Our Projects?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our premium residential and land development projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#projects">
                <Button size="lg">View Projects</Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
