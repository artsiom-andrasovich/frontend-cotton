"use client";

import { errorCatch } from "@/api/error";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { type ReactNode } from "react";

type ErrorStateProps = {
  error?: Error | null;
  isError?: boolean;
  isLoading?: boolean;
  retry?: () => void;
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  showRetry?: boolean;
  icon?: ReactNode;
};

export function ErrorState({
  error,
  isError,
  isLoading,
  retry,
  children,
  className = "",
  title,
  description,
  showRetry = true,
  icon,
}: ErrorStateProps) {
  // Don't show error state if loading or no error
  if (isLoading || (!isError && !error)) {
    return <>{children}</>;
  }

  // Determine error type and default messages
  const isNetworkError =
    error?.message?.includes("network") ||
    error?.message?.includes("fetch") ||
    error?.message?.includes("Failed to fetch");

  const defaultTitle = isNetworkError
    ? "Connection Error"
    : "Something went wrong";
  const defaultDescription = isNetworkError
    ? "Please check your internet connection and try again."
    : "An unexpected error occurred. Please try again.";

  const defaultIcon = isNetworkError ? (
    <WifiOff className="w-8 h-8" />
  ) : (
    <AlertTriangle className="w-8 h-8" />
  );

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        {icon || defaultIcon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title || defaultTitle}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {errorCatch(error) || description || defaultDescription}
      </p>

      {showRetry && retry && (
        <Button
          onClick={retry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

// Convenience component for common error patterns
export function QueryErrorState({
  error,
  isError,
  isLoading,
  retry,
  children,
  ...props
}: ErrorStateProps) {
  return (
    <ErrorState
      error={error}
      isError={isError}
      isLoading={isLoading}
      retry={retry}
      {...props}
    >
      {children}
    </ErrorState>
  );
}

// Network-specific error component
export function NetworkErrorState({
  retry,
  children,
  ...props
}: Omit<ErrorStateProps, "icon" | "title" | "description">) {
  return (
    <ErrorState
      icon={<WifiOff className="w-8 h-8" />}
      title="Connection Error"
      description="Please check your internet connection and try again."
      retry={retry}
      {...props}
    >
      {children}
    </ErrorState>
  );
}

// Generic error component
export function GenericErrorState({
  retry,
  children,
  ...props
}: Omit<ErrorStateProps, "icon" | "title" | "description">) {
  return (
    <ErrorState
      icon={<AlertTriangle className="w-8 h-8" />}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      retry={retry}
      {...props}
    >
      {children}
    </ErrorState>
  );
}
