import { AlertCircle, CheckCircle, RefreshCw, Star } from "lucide-react";
import { Rating } from "ts-fsrs";

export const getRatingIcon = (rating: Rating) => {
  switch (rating) {
    case Rating.Again:
      return <RefreshCw className="w-4 h-4" />;
    case Rating.Hard:
      return <AlertCircle className="w-4 h-4" />;
    case Rating.Good:
      return <CheckCircle className="w-4 h-4" />;
    case Rating.Easy:
      return <Star className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

export const getRatingColor = (rating: Rating): string => {
  switch (rating) {
    case Rating.Again:
      return "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800";
    case Rating.Hard:
      return "text-orange-600 bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800";
    case Rating.Easy:
      return "text-green-600 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";
    case Rating.Good:
      return "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800";
  }
};
