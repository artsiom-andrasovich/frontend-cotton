import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Trash, X } from "lucide-react";
import React, { useRef } from "react";
import { useClickAway } from "react-use";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isPending?: boolean;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isPending = false,
  variant = "default",
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    if (open) {
      onOpenChange(false);
    }
  });

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
          "w-[90%] max-w-md rounded-xl sm:rounded-lg", // Mobile friendly: 90% width, rounded corners
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center gap-3 sm:space-x-0">
          <AlertDialogCancel
            disabled={isPending}
            className="flex-1 bg-transparent border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 mt-0 sm:mt-0 flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending}
            className={cn(
              "flex-1 text-white border-none flex items-center justify-center gap-2",
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700",
            )}
          >
            {variant === "destructive" && <Trash className="h-4 w-4" />}
            {isPending ? "Processing..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
