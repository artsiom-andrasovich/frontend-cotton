"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NewCategoryInputProps = {
  newCategory: string;
  setNewCategory: (value: string) => void;
  onCancel: () => void;
};

export function NewCategoryInput({
  newCategory,
  setNewCategory,
  onCancel,
}: NewCategoryInputProps) {
  return (
    <div className="flex gap-2 mt-2">
      <Input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New category name"
        className="flex-1"
      />
      <Button type="button" variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
