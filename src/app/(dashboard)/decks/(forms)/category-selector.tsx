"use client";
import { CategoryIcon } from "@/components/shared/category-icon";
import { IconPicker } from "@/components/shared/icon-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { TCategory, TCategoryIcon, TUpdateDeck } from "@/services/types";
import { UseFormReturn } from "react-hook-form";
import { NewCategoryInput } from "./new-category-input";

type CategorySelectorProps = {
  form: UseFormReturn<TUpdateDeck>;
  allCategories: TCategory[];
  isCreatingCategory: boolean;
  setIsCreatingCategory: (value: boolean) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  onCancelCategory: () => void;
  disabled: boolean;
};

export function CategorySelector({
  form,
  allCategories,
  isCreatingCategory,
  setIsCreatingCategory,
  newCategory,
  setNewCategory,
  onCancelCategory,
  disabled,
}: CategorySelectorProps) {
  const { setValue } = form;

  const handleNewCategoryChange = (value: string) => {
    setNewCategory(value);
    setValue("category", value);
  };

  return (
    <FormField
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <div className="flex items-center gap-3">
              <select
                disabled={disabled}
                className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-sm"
                value={isCreatingCategory ? "__create__" : field.value}
                onChange={(e) => {
                  if (e.target.value === "__create__") {
                    setIsCreatingCategory(true);
                    setValue("category", "");
                  } else {
                    setIsCreatingCategory(false);
                    field.onChange(e);
                    // Set color and icon to match selected category
                    const cat = allCategories.find(
                      (c) => c.name === e.target.value,
                    );
                    if (cat) {
                      setValue("color", cat.color);
                      setValue("icon", cat.icon);
                    }
                  }
                }}
              >
                {allCategories
                  .filter((cat) => cat.name && cat.color && cat.icon)
                  .map((cat) => (
                    <option
                      key={cat.name + "-" + cat.color + "-" + cat.icon}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>
                  ))}
                <option value="__create__">+ Create new category</option>
              </select>

              <FormField
                name="icon"
                render={({ field: iconField }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Choose icon"
                      >
                        <CategoryIcon
                          type={(iconField.value as TCategoryIcon) ?? "mail"}
                          className="w-6 h-6 text-primary"
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-2 w-auto">
                      <IconPicker
                        value={iconField.value as any}
                        onChange={(icon) => {
                          iconField.onChange(icon);
                          setValue("icon", icon);
                          // Close popover after selection
                          if (document.activeElement) {
                            (document.activeElement as HTMLElement).blur();
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </FormControl>

          {isCreatingCategory && (
            <NewCategoryInput
              newCategory={newCategory}
              setNewCategory={handleNewCategoryChange}
              onCancel={onCancelCategory}
            />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
