"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      )}
    </button>
  );
}
