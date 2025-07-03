import { cn } from "@/lib/utils";
import { useState } from "react";

const colorOptions = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#a21caf" },
];
const colorMap = {
  red: "bg-red-700",
  blue: "bg-blue-700",
  green: "bg-green-700",
  yellow: "bg-yellow-700",
};

export const ColorPicker = () => {
  const [color, setColor] = useState(colorOptions[0].value);
  return (
    <div className="flex gap-3 items-center mt-2">
      {colorOptions.map((opt) => (
        <span key={opt.value}>
          <button
            type="button"
            onClick={() => setColor(opt.value)}
            className={cn(
              `w-8 h-8 rounded-full border-[3px] flex items-center justify-center transition-colors focus:outline-none ${
                color === opt.value
                  ? "border-gray-900 dark:border-white "
                  : "border-transparent"
              } `,
              `bg-${opt.name.toLowerCase()}-700`
            )}
            // style={{ backgroundColor: opt.value }}
            aria-label={opt.name}
          >
            {/* No inner circle, just border for selected */}
          </button>
        </span>
      ))}
    </div>
  );
};
