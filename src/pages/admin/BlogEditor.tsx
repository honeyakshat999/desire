import { useState, useEffect, useRef } from "react";
import imageCompression from "browser-image-compression";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { ArrowLeft, Save, Loader2, Eye, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: "draft" | "published";
}

const BlogEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { token } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content: "",
    cover_image: "",
    status: "draft",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing blog if editing
  useEffect(() => {
    if (isEditing && id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/.netlify/functions/blogs-api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.blog.title,
          excerpt: data.blog.excerpt || "",
          content: data.blog.content,
          cover_image: data.blog.cover_image || "",
          status: data.blog.status,
        });
      } else {
        toast({
          title: "Error",
          description: "Blog not found",
          variant: "destructive",
        });
        navigate("/admin/blogs");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const url = isEditing
        ? `/.netlify/functions/blogs-api/${id}`
        : "/.netlify/functions/blogs-api";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: isEditing ? "Blog updated successfully" : "Blog created successfully",
        });
        navigate("/admin/blogs");
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to save blog",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingCover(true);

    try {
      let fileToUpload = file;
      if (file.size > 9 * 1024 * 1024) {
        toast({
          title: "Compressing image...",
          description: "Reducing size while preserving quality",
        });
        fileToUpload = await imageCompression(file, {
          maxSizeMB: 9.5,
          initialQuality: 0.9,
          useWebWorker: true,
          preserveExif: true,
        });
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;

        try {
          const response = await fetch("/.netlify/functions/upload-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ image: base64 }),
          });

          if (response.ok) {
            const result = await response.json();
            setFormData((prev) => ({ ...prev, cover_image: result.url }));
            toast({
              title: "Success",
              description: "Cover image uploaded successfully",
            });
          } else {
            const error = await response.json();
            toast({
              title: "Upload Failed",
              description: error.error || "Failed to upload image",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            title: "Error",
            description: "Network error during upload",
            variant: "destructive",
          });
        } finally {
          setIsUploadingCover(false);
        }
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read file",
          variant: "destructive",
        });
        setIsUploadingCover(false);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
      setIsUploadingCover(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blogs")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">
            {isEditing ? "Edit Blog" : "New Blog"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update your blog post" : "Create a new blog post"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description for blog listing"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content *</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData((prev) => ({ ...prev, content }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "draft" | "published") =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? "Update" : "Create"} Blog
                      </>
                    )}
                  </Button>
                  {formData.status === "published" && isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.open(`/blogs/${id}`, "_blank")}
                      className="w-full"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Blog
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="url">URL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-3">
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
                        isUploadingCover && "opacity-50 pointer-events-none"
                      )}
                      onClick={() => coverImageInputRef.current?.click()}
                    >
                      {isUploadingCover ? (
                        <div className="flex flex-col items-center gap-2 py-2">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <p className="text-sm text-muted-foreground">Uploading...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-2">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Auto-compressed to fit 10MB
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCoverImageUpload(file);
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="url" className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="cover_image">Image URL</Label>
                      <Input
                        id="cover_image"
                        placeholder="https://example.com/image.jpg"
                        value={formData.cover_image}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, cover_image: e.target.value }))
                        }
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {formData.cover_image && (
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={formData.cover_image}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image";
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setFormData((prev) => ({ ...prev, cover_image: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
