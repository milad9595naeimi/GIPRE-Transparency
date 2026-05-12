import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  total,
  caption,
  accent = "default",
  className,
}: {
  label: string;
  value: number | string;
  total?: number | string;
  caption?: string;
  accent?: "default" | "signal" | "violet" | "sky" | "warn";
  className?: string;
}) {
  const accentBar = {
    default: "bg-border",
    signal: "bg-signal",
    violet: "bg-violet",
    sky: "bg-sky",
    warn: "bg-warn",
  }[accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/60 bg-background/60 px-4 py-4 transition-shadow hover:shadow-sm",
        className,
      )}
    >
      <div className={cn("absolute left-0 top-0 h-full w-[3px]", accentBar)} aria-hidden />
      <div className="pl-2">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold tabular-nums text-foreground">
            {value}
          </span>
          {total !== undefined && (
            <span className="text-sm text-muted-foreground tabular-nums">/ {total}</span>
          )}
        </div>
        {caption && <div className="mt-0.5 text-[12px] text-muted-foreground">{caption}</div>}
      </div>
    </div>
  );
}
