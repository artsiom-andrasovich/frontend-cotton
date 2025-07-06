"use client";
import { errorCatch } from "@/api/error";
import { Button } from "@/components/ui/button";
import { useListCategories } from "@/hooks/use-list-categories.hook";
import { useDeckMutation } from "@/hooks/use-update-deck.hook";
import { type TUpdateDeck, UpdateDeckSchema } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CategorySelector } from "./category-selector";
import { DeckFields } from "./deck-fields";

type TUpdateDeckProps = {
  deckId?: string;
};

export default function UpdateDeckForm({ deckId }: TUpdateDeckProps) {
  const FormName = deckId ? "Update Deck" : "Create deck";
  const { data: backendCategories, isLoading, isError } = useListCategories();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();
  const mutation = useDeckMutation();

  const allCategories = useMemo(() => {
    return Array.isArray(backendCategories) ? backendCategories : [];
  }, [backendCategories]);

  const form = useForm<TUpdateDeck>({
    resolver: zodResolver(UpdateDeckSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      color: "blue",
      icon: "bookOpen",
    },
  });

  useEffect(() => {
    if (allCategories.length > 0) {
      form.setValue("category", allCategories[0].name);
      form.setValue("color", allCategories[0].color || "blue");
      form.setValue("icon", allCategories[0].icon || "bookOpen");
    }
  }, [allCategories]);

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TUpdateDeck) => {
    try {
      const { name, description, category: categoryName, color, icon } = data;
      const newDeckId = await mutation.mutateAsync({
        data: {
          name,
          description,
          category: {
            name: categoryName,
            color,
            icon,
          },
        },
      });

      const { toast } = await import("react-hot-toast");
      toast.success("Deck created!");
      router.push(`/decks/${newDeckId}`);
    } catch (error) {
      const { toast } = await import("react-hot-toast");
      toast.error(errorCatch(error));
    }
  };

  const handleCancelCategory = () => {
    setIsCreatingCategory(false);
    setNewCategory("");
    if (allCategories.length > 0) {
      setValue("category", allCategories[0].name);
      setValue("color", allCategories[0].color);
      setValue("icon", allCategories[0].icon);
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-500">Failed to load categories.</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">{FormName}</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DeckFields form={form} />

          <CategorySelector
            form={form}
            allCategories={allCategories}
            isCreatingCategory={isCreatingCategory}
            setIsCreatingCategory={setIsCreatingCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            onCancelCategory={handleCancelCategory}
            disabled={isLoading}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : FormName}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
