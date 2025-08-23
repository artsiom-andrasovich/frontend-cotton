"use client";

import { errorCatch } from "@/api/error";
import { Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useCreateCardMutate, useGetCardById } from "@/hooks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createEmptyCard } from "ts-fsrs";
import { ZodIssue } from "zod";
import { RichEditor } from "../(forms)/rich-editor";
import { validateMd } from "../(forms)/validate-md.util";

type UpdateCardFormProps = {
  deckId: string;
  cardId?: string;
};

export default function UpdateCardForm({
  deckId,
  cardId,
}: UpdateCardFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [errorQuestion, setErrorQuestion] = useState<string | null>(null);
  const [errorAnswer, setErrorAnswer] = useState<string | null>(null);
  const router = useRouter();
  const mutation = useCreateCardMutate(deckId, cardId);

  const { data: cardData, isLoading } = useGetCardById(
    deckId,
    cardId ? cardId : ""
  );
  useEffect(() => {
    console.log(cardData);

    setQuestion(cardData?.question ?? "");
    setAnswer(cardData?.answer ?? "");
  }, [cardData, cardId]);

  function handleErrors(issues: ZodIssue[]) {
    setErrorQuestion(null);
    setErrorAnswer(null);
    issues.forEach((issue) => {
      const field = issue.path[0];
      if (field === "question") {
        setErrorQuestion(issue.message);
      }
      if (field === "answer") {
        setErrorAnswer(issue.message);
      }
    });
  }
  async function onSubmit() {
    const isError = validateMd({ question, answer });
    if (isError) {
      handleErrors(isError);
      return;
    }
    const fsrsCard = createEmptyCard();

    try {
      const { toast } = await import("react-hot-toast");
      if (cardId) mutation.mutateAsync({ deckId, cardId, answer, question });
      else mutation.mutateAsync({ deckId, answer, question, fsrsCard });
      setErrorQuestion(null);
      setErrorAnswer(null);
      toast.success(`Deck ${cardId ? "updated" : "created"}!`);
      router.push(`/decks/${deckId}`);
    } catch (error) {
      const { toast } = await import("react-hot-toast");
      toast.error(errorCatch(error));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-4xl">
        <Navbar title={`${cardId ? "Update" : "Create"} Card`} />
        <div className="bg-white dark:bg-gray-900 shadow-lg p-4 border border-gray-200 dark:border-gray-800">
          <div className="space-y-6">
            <div>
              <label
                className={cn(
                  "block text-xl font-bold mb-2",
                  !!errorQuestion && "text-red-500  "
                )}
              >
                Question <br />
                <span className="text-red-500 text-sm">{errorQuestion}</span>
              </label>

              <RichEditor value={question} onChange={setQuestion} />
            </div>

            <div>
              <label
                className={cn(
                  "block text-xl font-bold mb-2",
                  !!errorAnswer && "text-red-500  "
                )}
              >
                Answer <br />
                <span className="text-red-500 text-sm">{errorAnswer}</span>
              </label>
              <RichEditor value={answer} onChange={setAnswer} />
            </div>

            {mutation.error && (
              <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-md px-3 py-2 text-sm text-center mt-2">
                {errorCatch(mutation.error)}
              </div>
            )}
            <Button
              onClick={onSubmit}
              disabled={mutation.isPending}
              className="w-full mt-4"
            >
              {mutation.isPending
                ? `${cardId ? "Updating" : "creating"}...`
                : `${cardId ? "Update" : "Create"} Card`}
            </Button>
          </div>
          {/** */}
        </div>
      </div>
    </div>
  );
}
