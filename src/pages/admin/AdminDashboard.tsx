import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, MousePointerClick, MessageSquare, FileText, TrendingUp, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalyticsSummary {
  totalPageViews: number;
  totalEnquiryClicks: number;
  totalEnquiries: number;
}

interface RecentEnquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  project: string | null;
  created_at: string;
}

interface DashboardData {
  summary: AnalyticsSummary;
  enquiries: {
    recent: RecentEnquiry[];
  };
}

const AdminDashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/.netlify/functions/analytics-api?days=30", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError("Failed to fetch analytics");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={fetchDashboard}>Try Again</Button>
      </div>
    );
  }

  const stats = [
    {
      title: "Page Views",
      value: data?.summary.totalPageViews || 0,
      icon: Eye,
      description: "Last 30 days",
      color: "bg-blue-500",
    },
    {
      title: "Enquiry Clicks",
      value: data?.summary.totalEnquiryClicks || 0,
      icon: MousePointerClick,
      description: "Button interactions",
      color: "bg-green-500",
    },
    {
      title: "Enquiries",
      value: data?.summary.totalEnquiries || 0,
      icon: MessageSquare,
      description: "Form submissions",
      color: "bg-accent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your website activity</p>
        </div>
        <Button variant="outline" onClick={fetchDashboard} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/blogs/new">
              <Button className="w-full justify-start gap-2" variant="outline">
                <FileText className="h-4 w-4" />
                Create New Blog Post
              </Button>
            </Link>
            <Link to="/admin/blogs">
              <Button className="w-full justify-start gap-2" variant="outline">
                <TrendingUp className="h-4 w-4" />
                Manage All Blogs
              </Button>
            </Link>
            <Link to="/admin/analytics">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Eye className="h-4 w-4" />
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Enquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Enquiries
            </CardTitle>
            <CardDescription>Latest form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.enquiries.recent && data.enquiries.recent.length > 0 ? (
              <div className="space-y-4">
                {data.enquiries.recent.slice(0, 5).map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">{enquiry.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {enquiry.project || "General Enquiry"}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No recent enquiries
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
