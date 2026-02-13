import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "default" | "destructive";
  href?: string;
  className?: string;
}

export function MenuItem({
  label,
  onClick,
  icon: Icon,
  variant = "default",
  href,
  className,
}: MenuItemProps) {
  const isDestructive = variant === "destructive";

  const content = (
    <>
      {Icon && (
        <Icon
          className={cn(
            "mr-2 h-4 w-4",
            isDestructive &&
              "text-red-600 dark:text-red-400 group-focus:text-red-700 dark:group-focus:text-red-300",
          )}
        />
      )}
      <span>{label}</span>
    </>
  );

  const mergedClassName = cn(
    "focus:bg-gray-100 dark:focus:bg-gray-700 cursor-pointer flex items-center w-full",
    isDestructive
      ? "text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
      : "text-gray-700 dark:text-gray-200",
    className,
  );

  if (href) {
    return (
      <DropdownMenuItem asChild className={mergedClassName}>
        <Link href={href}>{content}</Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={onClick} className={mergedClassName}>
      {content}
    </DropdownMenuItem>
  );
}
