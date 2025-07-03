import { Checkbox } from "../ui/checkbox";

export type TFilterCheckboxProps = {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
};

export const FilterCheckbox = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}: TFilterCheckboxProps) => {
  return (
    <label
      htmlFor={`checkbox-${String(name)}-${String(value)}`}
      className="flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded"
    >
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary dark:border-gray-600"
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
        {text}
      </span>
      {endAdornment && <span className="ml-auto">{endAdornment}</span>}
    </label>
  );
};
