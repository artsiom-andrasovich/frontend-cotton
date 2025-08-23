import { createCardSchema } from "@/services/types";
import { ZodIssue } from "zod";

function getHtmlTextLength(html: string): string {
  let text = "";
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    text = doc.body.textContent || "";
  } else {
    text = html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ");
  }

  text = text.replace(/\s+/g, " ").trim();

  console.log("Длина строки:", text.length);
  return text;
}
type TMdHtmlFields = {
  answer: string;
  question: string;
};

export const validateMd = ({
  answer: _answer,
  question: _question,
}: TMdHtmlFields): ZodIssue[] | null => {
  const answer = getHtmlTextLength(_answer);
  const question = getHtmlTextLength(_question);
  const result = createCardSchema.safeParse({ answer, question });
  console.log(result.success);
  if (!result.success) {
    return result.error.issues;
  }
  return null;
};
