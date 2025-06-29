"use client";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme.provider";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        toastOptions={{
          className:
            "dark:bg-gray-800 dark:border-gray-700 dark:border dark:text-white",
        }}
      />
    </ThemeProvider>
  );
}
