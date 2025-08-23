"use client";
import { cn } from "@/lib/utils";
import { MathExtension } from "@aarkue/tiptap-math-extension";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";
import { CodeBlockController, Toolbar } from "./md-components";

interface RichEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const lowlight = createLowlight(all);

export function RichEditor({
  value = "",
  onChange,
  disabled = false,
  className,
}: RichEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: false,

        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockController);
        },
      }).configure({ lowlight }),

      TextStyle,
      MathExtension.configure({
        katexOptions: {
          throwOnError: false,
          errorColor: "#cc0000",
          displayMode: true,
        },
      }),
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none h-full focus:outline-none",
        role: "textbox",
      },
      scrollThreshold: 80,
      scrollMargin: 80,
    },
    onUpdate: ({ editor }) => {
      queueMicrotask(() => {
        onChange?.(editor.getHTML());
      });
    },
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="" style={{ overscrollBehavior: "contain" }}>
      {!disabled && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          `
          h-[200px]
           p-3 bg-white border border-gray-300 rounded-md shadow-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          dark:bg-gray-800 dark:border-gray-700 dark:shadow-none dark:focus-visible:ring-blue-400
          // ${disabled ? " pointer-events-none" : ""}
        `,
          className
        )}
      />
    </div>
  );
}
