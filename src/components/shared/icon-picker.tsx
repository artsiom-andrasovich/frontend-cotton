import { CategoryIcon } from "@/components/shared/category-icon";
import { ALLOWED_ICONS } from "@/constants";
import { cn } from "@/lib/utils";
import { type TCategoryIcon } from "@/services/types";

type IconPickerProps = {
  value: TCategoryIcon;
  onChange: (icon: TCategoryIcon) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-3 mt-2">
      {ALLOWED_ICONS.map((icon) => (
        <button
          type="button"
          key={icon}
          onClick={() => onChange(icon)}
          className={cn(
            "flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-gray-800 shadow-sm border transition-all group focus:outline-none",
            value === icon
              ? "ring-2 ring-primary border-primary bg-primary/10 dark:bg-primary/20"
              : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          aria-label={icon}
        >
          <CategoryIcon
            type={icon}
            className={cn(
              "w-7 h-7 mb-1",
              value === icon
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
            )}
          />
        </button>
      ))}
    </div>
  );
}
