"use client";

import { Suspense } from "react";
import { DecksContent } from "./decks-content";

export default function DecksPage() {
  return (
    <div className="p-4 space-y-6">
      <Suspense>
        <DecksContent />
      </Suspense>
    </div>
  );
}
