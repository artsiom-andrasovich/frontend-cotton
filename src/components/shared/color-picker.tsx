import { colorMap } from "@/constants";
import { cn } from "@/lib/utils";
type TColorPickerProps = {
  activeColor: keyof typeof colorMap;
  setActiveColor: (key: keyof typeof colorMap) => void;
};

export const ColorPicker = ({
  activeColor,
  setActiveColor,
}: TColorPickerProps) => {
  return (
    <div className="flex gap-3 items-center mt-2">
      {(Object.keys(colorMap) as (keyof typeof colorMap)[]).map((opt) => (
        <span key={opt}>
          <button
            type="button"
            onClick={() => setActiveColor(opt)}
            className={cn(
              `w-8 h-8 rounded-full border-[3px] flex items-center justify-center transition-colors focus:outline-none  ${
                activeColor === opt
                  ? "border-gray-900 dark:border-white "
                  : "border-transparent"
              } `,
              colorMap[opt]
            )}
            aria-label={opt}
          ></button>
        </span>
      ))}
    </div>
  );
};
