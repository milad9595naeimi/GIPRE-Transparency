import { cn, classifyStatus } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const { label, badge } = classifyStatus(status);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums",
        badge,
        className,
      )}
    >
      {label}
    </span>
  );
}
