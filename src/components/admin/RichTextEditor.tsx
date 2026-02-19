import { useEditor, EditorContent, Editor } from "@tiptap/react";
import imageCompression from "browser-image-compression";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Pilcrow,
  Upload,
  Loader2,
  FileCode,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "p-2 rounded hover:bg-muted transition-colors",
      isActive && "bg-muted text-primary",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

const MenuBar = ({ editor }: { editor: Editor }) => {
  const { token } = useAuth();
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [htmlDialogOpen, setHtmlDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }
    setLinkUrl("");
    setLinkDialogOpen(false);
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
    setImageUrl("");
    setUploadError(null);
    setImageDialogOpen(false);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      let fileToUpload = file;
      if (file.size > 9 * 1024 * 1024) {
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
            setImageUrl(result.url);
          } else {
            const error = await response.json();
            setUploadError(error.error || "Upload failed");
          }
        } catch (err) {
          setUploadError("Network error during upload");
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        setUploadError("Failed to read file");
        setIsUploading(false);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (err) {
      setUploadError("Failed to process image");
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const openImageDialog = () => {
    setImageUrl("");
    setUploadError(null);
    setImageDialogOpen(true);
  };

  const insertHtmlContent = () => {
    if (htmlContent.trim()) {
      // Convert common markdown-style markers to HTML
      let processedContent = htmlContent
        // Convert [H2] markers to h2 tags
        .replace(/\[H2\]\s*(.*?)(?=\n|$)/g, '<h2>$1</h2>')
        // Convert [H3] markers to h3 tags  
        .replace(/\[H3\]\s*(.*?)(?=\n|$)/g, '<h3>$1</h3>')
        // Convert markdown images ![alt](src) to img tags
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />')
        // Convert **text** to <strong>text</strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert bullet points (• or *) to list items
        .replace(/^[•*]\s+(.*)$/gm, '<li>$1</li>')
        // Convert numbered lists (1. 2. etc) to ordered list items
        .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
        // Convert line breaks to paragraphs
        .split('\n\n')
        .map(paragraph => {
          paragraph = paragraph.trim();
          if (!paragraph) return '';
          
          // If it contains list items, wrap in ul or ol
          if (paragraph.includes('<li>')) {
            // Check if it's a numbered list context or bullet list
            const originalText = htmlContent.includes('1.') || htmlContent.includes('2.') ? 'ol' : 'ul';
            return `<${originalText}>${paragraph}</${originalText}>`;
          }
          
          // If it's already a heading, don't wrap in p tag
          if (paragraph.startsWith('<h')) {
            return paragraph;
          }
          
          // Wrap regular content in p tag
          return `<p>${paragraph}</p>`;
        })
        .join('');

      // Insert the processed HTML content
      editor.chain().focus().insertContent(processedContent).run();
      setHtmlContent("");
      setHtmlDialogOpen(false);
    }
  };

  return (
    <>
      <div className="border-b p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Headings */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Media */}
        <MenuButton onClick={() => setLinkDialogOpen(true)} title="Add Link">
          <LinkIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton onClick={openImageDialog} title="Add Image">
          <ImageIcon className="h-4 w-4" />
        </MenuButton>
        <MenuButton onClick={() => setHtmlDialogOpen(true)} title="Paste HTML/Formatted Content">
          <FileCode className="h-4 w-4" />
        </MenuButton>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Undo/Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
      </div>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLink()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addLink}>Add Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">Image URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <Label>Choose an image to upload</Label>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors",
                    isUploading && "opacity-50 pointer-events-none"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to select an image
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Auto-compressed to fit 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              
              {imageUrl && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-2">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded"
                    />
                  </div>
                  <Input
                    value={imageUrl}
                    readOnly
                    className="text-xs"
                  />
                </div>
              )}
              
              {uploadError && (
                <p className="text-sm text-destructive">{uploadError}</p>
              )}
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addImage()}
                />
              </div>
              
              {imageUrl && imageUrl.startsWith("http") && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-2">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addImage} disabled={!imageUrl || isUploading}>
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* HTML Paste Dialog */}
      <Dialog open={htmlDialogOpen} onOpenChange={setHtmlDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Paste HTML or Formatted Content</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Content to Insert</Label>
              <p className="text-sm text-muted-foreground">
                Paste your content below. It supports:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>• Raw HTML tags</li>
                <li>• [H2] and [H3] markers for headings</li>
                <li>• **bold text** formatting</li>
                <li>• Bullet points with • or *</li>
                <li>• Numbered lists (1. 2. 3.)</li>
              </ul>
              <textarea
                className="w-full min-h-[300px] p-3 border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
                placeholder="Paste your content here...

Example:
[H2] Why Jaipur Real Estate is Booming

Jaipur, the **Pink City of India**, has emerged as one of the most promising destinations.

[H3] Key Benefits

• **Metro Rail Expansion** - Connecting major hubs
• **Smart City Initiatives** - Modern amenities  
• **RERA Protection** - Buyer safety

[H2] Investment Options

1. Luxury apartments in Vaishali Nagar
2. Premium plots in Chaksu  
3. Commercial spaces"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setHtmlDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={insertHtmlContent} disabled={!htmlContent.trim()}>
              <Clipboard className="mr-2 h-4 w-4" />
              Insert Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const RichTextEditor = ({
  content,
  onChange,
  placeholder = "Write your blog content here...",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none p-4 min-h-[300px] focus:outline-none prose-headings:font-serif prose-headings:text-primary prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-blockquote:border-l-accent prose-a:text-accent",
      },
    },
  });

  // Update editor content when prop changes (e.g., when editing existing blog)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
