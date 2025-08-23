"use client";
import { errorCatch } from "@/api/error";
import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { useDeckMutation, useGetDeckById } from "@/hooks";
import { useListCategories } from "@/hooks/categories/use-list-categories.hook";
import { TUpdateDeck, UpdateDeckSchema } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CategorySelector } from "./category-selector";
import { DeckFields } from "./deck-fields";

type TUpdateDeckProps = {
  deckId?: string;
};

export default function UpdateDeckForm({ deckId }: TUpdateDeckProps) {
  const FormName = deckId ? "Update Deck" : "Create deck";
  const {
    data: backendCategories = [],
    isLoading: isLoadingCategories,
    isError,
  } = useListCategories();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();
  const mutation = useDeckMutation();

  // 🔹 Получаем колоду, если это update
  const { data: deckData, isLoading: isLoadingDeck } = useGetDeckById(
    deckId || ""
  );

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

  // 🔹 При загрузке данных (edit) — обновляем значения формы
  useEffect(() => {
    if (deckData) {
      form.reset({
        name: deckData.name || "",
        description: deckData.description || "",
        category: deckData.category?.name || "",
        color: deckData.category?.color || "blue",
        icon: deckData.category?.icon || "bookOpen",
      });
    } else if (!deckId && backendCategories.length > 0) {
      form.setValue("category", backendCategories[0].name);
      form.setValue("color", backendCategories[0].color || "blue");
      form.setValue("icon", backendCategories[0].icon || "bookOpen");
    }
  }, [deckData, deckId, backendCategories]);

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TUpdateDeck) => {
    try {
      const { name, description, category: categoryName, color, icon } = data;

      const res = await mutation.mutateAsync({
        deckId,
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
      if (deckId) {
        toast.success("Deck updated!");

        router.push(`/decks/${deckId}`);
      } else {
        toast.success("Deck created!");
        router.push(`/decks/${res}`);
      }
    } catch (error) {
      const { toast } = await import("react-hot-toast");
      toast.error(errorCatch(error));
    }
  };

  const handleCancelCategory = () => {
    setIsCreatingCategory(false);
    setNewCategory("");

    if (backendCategories.length > 0) {
      setValue("category", backendCategories[0].name);
      setValue("color", backendCategories[0].color);
      setValue("icon", backendCategories[0].icon);
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-red-500">Failed to load categories.</span>
      </div>
    );
  }

  if (deckId && isLoadingDeck) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-600 dark:text-gray-200">
          Loading deck...
        </span>
      </div>
    );
  }
  const path = deckId ? AppPaths.deck.DECKS + `/${deckId}` : undefined;

  return (
    <>
      <Navbar path={path} title={FormName} />
      <div className="max-w-lg mx-auto p-6">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DeckFields form={form} />

            <CategorySelector
              form={form}
              allCategories={backendCategories}
              isCreatingCategory={isCreatingCategory}
              setIsCreatingCategory={setIsCreatingCategory}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              onCancelCategory={handleCancelCategory}
              disabled={isLoadingCategories}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? deckId
                  ? "Updating..."
                  : "Creating..."
                : FormName}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
