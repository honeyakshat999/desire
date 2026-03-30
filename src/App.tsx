import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

const Index = React.lazy(() => import("./pages/Index"));
const About = React.lazy(() => import("./pages/About"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Terms = React.lazy(() => import("./pages/Terms"));
const ProjectDetail = React.lazy(() => import("./pages/ProjectDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlogsList = React.lazy(() => import("./pages/BlogsList"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = React.lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogsList = React.lazy(() => import("./pages/admin/BlogsList"));
const BlogEditor = React.lazy(() => import("./pages/admin/BlogEditor"));
const AdminAnalytics = React.lazy(() => import("./pages/admin/AdminAnalytics"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/blogs" element={<BlogsList />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="blogs" element={<AdminBlogsList />} />
                <Route path="blogs/new" element={<BlogEditor />} />
                <Route path="blogs/:id/edit" element={<BlogEditor />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
