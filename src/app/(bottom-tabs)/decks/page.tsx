"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import { DecksContent } from "./decks-content";

export default function DecksPage() {
  return (
    <div className="p-4 space-y-6">
     <Suspense
  fallback={
    <div className="flex justify-center items-center h-24">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  }
>
        <DecksContent />
      </Suspense>
    </div>
  );
}
