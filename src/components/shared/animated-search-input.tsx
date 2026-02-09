import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "../ui";

type AnimatedSearchInputProps = {
  search: string;
  setSearch: (val: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
};

export function AnimatedSearchInput({
  search,
  setSearch,
  onFocusChange,
}: AnimatedSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clearingRef = useRef(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    if (clearingRef.current) {
      clearingRef.current = false;
      return;
    }
    if (search.length === 0) {
      setIsFocused(false);
      onFocusChange?.(false);
    }
  };

  const handleClearPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = inputRef.current;
    if (!el) return;

    clearingRef.current = true;
    setSearch("");
    try {
      el.setSelectionRange(0, 0);
    } catch {}
    try {
      window.getSelection?.()?.removeAllRanges?.();
    } catch {}

    requestAnimationFrame(() => {
      el.blur();
      setIsFocused(false);
      onFocusChange?.(false);
    });
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        className="relative flex items-center transition-all duration-500 min-w-0"
        style={{ maxWidth: isFocused ? 400 : 36 }}
      >
        <Input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoCorrect="off"
          spellCheck={false}
          autoCapitalize="none"
          placeholder={isFocused ? "Search cards..." : ""}
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full transition-all duration-300 z-10 appearance-none ${
            isFocused ? "pl-10 pr-7" : "pl-2"
          }`}
        />

        {/* Лупа слева, поверх */}
        <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        {/* Крестик справа, поверх */}
        {search.length > 0 && (
          <button
            type="button"
            onPointerDown={handleClearPointerDown}
            aria-label="Clear"
            className="absolute z-20 right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
