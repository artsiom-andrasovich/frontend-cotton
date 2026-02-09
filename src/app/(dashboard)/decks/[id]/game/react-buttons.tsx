import { Button } from "@/components/ui";
import { AlertTriangle, CheckCircle, Star, XCircle } from "lucide-react";
import { Rating } from "ts-fsrs";

type ReactButtonsProps = {
  showAnswer: boolean;
  setShowAnswer: (val: boolean) => void;
  handleRating: (rating: Rating) => void;
};

export function ReactButtons({
  setShowAnswer,
  showAnswer,
  handleRating,
}: ReactButtonsProps) {
  return (
    <div className=" bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="max-w-4xl mx-auto">
        {!showAnswer ? (
          <Button
            onClick={() => setShowAnswer(true)}
            className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700"
          >
            Show Answer
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              How well did you know this?
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handleRating(Rating.Again)}
                className="h-14 gap-3 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 text-base font-medium"
              >
                <XCircle className="w-5 h-5" />
                Again
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRating(Rating.Hard)}
                className="h-14 gap-3 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 text-base font-medium"
              >
                <AlertTriangle className="w-5 h-5" />
                Hard
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRating(Rating.Good)}
                className="h-14 gap-3 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-base font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Good
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRating(Rating.Easy)}
                className="h-14 gap-3 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-base font-medium"
              >
                <Star className="w-5 h-5" />
                Easy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
