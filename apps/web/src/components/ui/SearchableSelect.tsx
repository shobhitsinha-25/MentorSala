import { useMemo, useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  value,
  options,
  placeholder = "Select...",
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the label of the currently selected item to show on the button
  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;

    return options.filter((option) =>
      option.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, options]);

  // Close the dropdown when clicking anywhere outside of the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search string whenever dropdown opens/closes
  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-850 bg-slate-950 px-3.5 py-2 text-left text-sm text-slate-200 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
      >
        <span className={selectedOption ? "text-slate-200" : "text-slate-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 z-50 w-full rounded-xl border border-slate-850 bg-slate-900 p-1.5 shadow-xl">
          {/* Inner Search Box */}
          <div className="relative mb-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-slate-850 bg-slate-950 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-slate-800"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto space-y-0.5 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-500 text-center">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                    option.value === value
                      ? "bg-indigo-600 text-white font-medium"
                      : "text-slate-300 hover:bg-slate-850 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}