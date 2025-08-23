import { TCategory } from "@/services/types";

type DeckInfoProps = {
  category: TCategory;
  lastStudied: string;
  createdAt: string;
};

export const DeckInfo = ({
  category,
  lastStudied,
  createdAt,
}: DeckInfoProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
        Deck Information
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Category:</span>
          <span className="text-gray-900 dark:text-white">
            {category?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Created:</span>
          <span className="text-gray-900 dark:text-white">{createdAt}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Last studied:
          </span>
          <span className="text-gray-900 dark:text-white">{lastStudied}</span>
        </div>
      </div>
    </div>
  );
};
