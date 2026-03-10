"use client";
import { ColorPicker } from "@/components/shared";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TUpdateDeck } from "@/services/types";
import { UseFormReturn, useWatch } from "react-hook-form";

type DeckFieldsProps = {
  form: UseFormReturn<TUpdateDeck>;
};

export function DeckFields({ form }: DeckFieldsProps) {
  const { setValue } = form;
  const description = useWatch({ control: form.control, name: "description" });
  const characters = description?.length || 0;
  return (
    <>
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deck Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter deck name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <div className="relative">
                <textarea
                  className="flex min-h-[120px] w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30 resize-none md:text-sm"
                  placeholder="Enter deck description"
                  {...field}
                  maxLength={150}
                />
                <span className="absolute right-2 bottom-2">
                  {characters}/150
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deck Color</FormLabel>
            <FormControl>
              <ColorPicker
                activeColor={field.value as any}
                setActiveColor={(val) => setValue("color", val)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
