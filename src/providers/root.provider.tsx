"use client";

import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "./react-query.provider";
import { ThemeProvider } from "./theme.provider";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        {children}
        <Toaster
          toastOptions={{
            className:
              "dark:bg-gray-800 dark:border-gray-700 dark:border dark:text-white",
          }}
        />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
