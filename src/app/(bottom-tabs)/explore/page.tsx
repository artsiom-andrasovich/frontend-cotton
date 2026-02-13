import { Rocket } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
      <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full">
        <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Explore is Coming Soon!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-xs">
        We're working hard to bring you exciting new ways to discover content. 
        Stay tuned for future updates!
      </p>
    </div>
  );
}
