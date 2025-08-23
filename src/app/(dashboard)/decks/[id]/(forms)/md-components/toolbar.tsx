import { Button } from "@/components/ui";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";

type MenuBarProps = {
  editor: any;
};

export function Toolbar({ editor }: MenuBarProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      isCode: ctx.editor?.isActive("codeBlock") ?? false,

      isAlignLeft: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor?.isActive({ textAlign: "right" }) ?? false,

      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
      isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
    }),
  });

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-background rounded-t-lg">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editorState?.isBold ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editorState?.isItalic ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editorState?.isUnderline ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editorState?.isStrike ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editorState?.isCode ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" })
            ? "bg-accent text-accent-foreground"
            : ""
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "bg-accent text-accent-foreground"
            : ""
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "bg-accent text-accent-foreground"
            : ""
        }
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      {/* Headings */}

      {/* List / Quote */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editorState?.isBulletList ? "bg-accent text-accent-foreground" : ""
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editorState?.isOrderedList ? "bg-accent text-accent-foreground" : ""
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editorState?.isBlockquote ? "bg-accent text-accent-foreground" : ""
        }
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
}
