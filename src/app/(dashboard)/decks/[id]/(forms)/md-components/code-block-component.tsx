import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useState } from "react";

interface CodeBlockControllerProps extends NodeViewProps {
  lowlight?: any;
}

export const CodeBlockController: React.FC<CodeBlockControllerProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
  node,
  editor,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    queueMicrotask(() => {
      const codeText = node.textContent || "";
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    });
  };
  return (
    <NodeViewWrapper className="h-auto [&]:mb-0 bg-white dark:bg-gray-800 rounded-md shadow-md dark:shadow-none">
      <pre className="overflow-x-auto rounded-md mb-0 bg-gray-50 dark:bg-gray-900 p-4  text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        <div className="flex justify-end">
          {!editor.isEditable ? (
            <div className="flex relative items-center gap-2">
              <span
                contentEditable={false}
                onClick={handleCopy}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                title="Copy code to clipboard"
              >
                {defaultLanguage || "text"}
              </span>
              <span className="sr-only">Click to copy</span>
              <span
                className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium px-2 py-1 rounded-lg shadow-md transition-opacity duration-200 pointer-events-none z-50 ${
                  copied ? "opacity-100" : "opacity-0"
                }`}
              >
                Copied!
              </span>
            </div>
          ) : (
            <select
              className=" bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 "
              contentEditable={false}
              defaultValue={defaultLanguage ?? "null"}
              onChange={(event) =>
                updateAttributes({ language: event.target.value })
              }
            >
              <option value="null">auto</option>
              <option disabled>—</option>
              {extension.options.lowlight
                .listLanguages()
                .map((lang: string) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
            </select>
          )}
        </div>
        <code>
          <NodeViewContent />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};

{
  /**import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React from "react";

interface CodeBlockControllerProps extends NodeViewProps {
  lowlight: any;
}

export const CodeBlockController: React.FC<CodeBlockControllerProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  lowlight,
}) => {
  return (
    <NodeViewWrapper className="relative bg-white dark:bg-gray-800 rounded-md shadow-md dark:shadow-none  ">
      <select
        className="absolute right-[0.5rem] top-[0.5rem] bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        contentEditable={false}
        defaultValue={defaultLanguage ?? "null"}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {lowlight.listLanguages().map((lang: string) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className="overflow-x-auto rounded-md bg-gray-50 dark:bg-gray-900 p-4  text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        <code>
          <NodeViewContent />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};
 */
}
