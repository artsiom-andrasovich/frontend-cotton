"use client";

import { cn } from "@/lib/utils";
import katex from "katex";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface RichEditorViewProps {
  content: string;
  className?: string;
}

// KaTeX rendering options
const KATEX_OPTIONS = {
  throwOnError: false,
  errorColor: "#cc0000",
} as const;

// Math processing regex patterns
const MATH_PATTERNS = {
  display: /\$\$([^$]+)\$\$/g,
  inline: /\$([^$]+)\$/g,
} as const;

// CSS classes for math elements
const MATH_CLASSES = {
  inline: "math",
  display: "math-display",
} as const;

export function RichEditorView({ content, className }: RichEditorViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized content processing function
  const processMathContent = useCallback((container: HTMLElement) => {
    // Process raw LaTeX content first
    const textNodes = container.querySelectorAll("p, div, span");

    textNodes.forEach((node) => {
      if (!node.textContent) return;

      let newHTML = node.innerHTML;
      let hasChanges = false;

      // Replace display math ($$...$$)
      const displayMatches = newHTML.match(MATH_PATTERNS.display);
      if (displayMatches) {
        newHTML = newHTML.replace(
          MATH_PATTERNS.display,
          `<span class="${MATH_CLASSES.display}">$1</span>`
        );
        hasChanges = true;
      }

      // Replace inline math ($...$)
      const inlineMatches = newHTML.match(MATH_PATTERNS.inline);
      if (inlineMatches) {
        newHTML = newHTML.replace(
          MATH_PATTERNS.inline,
          `<span class="${MATH_CLASSES.inline}">$1</span>`
        );
        hasChanges = true;
      }

      if (hasChanges) {
        node.innerHTML = newHTML;
      }
    });
  }, []);

  // Memoized KaTeX rendering function
  const renderMathElements = useCallback((container: HTMLElement) => {
    const mathElements = container.querySelectorAll(
      `.${MATH_CLASSES.inline}, .${MATH_CLASSES.display}`
    );

    mathElements.forEach((element) => {
      const content = element.textContent || "";
      const isDisplay = element.classList.contains(MATH_CLASSES.display);

      try {
        const rendered = katex.renderToString(content, {
          ...KATEX_OPTIONS,
          displayMode: isDisplay,
        });
        element.innerHTML = rendered;
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        // Keep original content on error
      }
    });
  }, []);

  // Memoized content processing effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Process math content
    processMathContent(container);

    // Render math elements
    renderMathElements(container);
  }, [content, processMathContent, renderMathElements]);

  // Memoized CSS classes
  const containerClasses = useMemo(
    () =>
      cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
        "prose-em:text-foreground prose-code:text-foreground prose-blockquote:text-foreground",
        "prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
        "prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground",
        "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-4",
        "prose-blockquote:italic prose-blockquote:text-muted-foreground",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:marker:text-muted-foreground",
        // Math styles
        `[&_.${MATH_CLASSES.inline}]:inline-block [&_.${MATH_CLASSES.inline}]:mx-0.5 [&_.${MATH_CLASSES.inline}]:font-['KaTeX_Main']`,
        `[&_.${MATH_CLASSES.display}]:block [&_.${MATH_CLASSES.display}]:text-center [&_.${MATH_CLASSES.display}]:my-4 [&_.${MATH_CLASSES.display}]:font-['KaTeX_Main']`,
        `[&_.${MATH_CLASSES.display}_.${MATH_CLASSES.inline}]:block [&_.${MATH_CLASSES.display}_.${MATH_CLASSES.inline}]:m-0`,
        className
      ),
    [className]
  );

  // Memoized HTML content
  const htmlContent = useMemo(
    () => content || "<p>No content to display</p>",
    [content]
  );

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
