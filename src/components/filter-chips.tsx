import { cn } from "@/lib/utils";

export function FilterChips({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
  label: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap gap-2.5" role="group" aria-label={label}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            className={cn("filter-chip", active && "is-active")}
            aria-pressed={active}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
