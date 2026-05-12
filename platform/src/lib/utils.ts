// Shared UI utilities for the GIPRE Transparency platform.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className composer (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Classify a STATUS_PATTERNS key (or status_cell containing an emoji) into
 *  a human label + a Tailwind badge class.
 *
 *  Inputs accepted:
 *    - status keys: "done" | "in_progress" | "pending" | "blocked" | "planned" | "unknown"
 *    - raw status cell strings containing the emoji (✅ / 🟡 / ⏳ / 🚧 / 📋)
 */
export function classifyStatus(status: string): { label: string; badge: string } {
  const s = (status || "").toLowerCase();
  const cell = status || "";

  if (s === "done" || cell.includes("✅")) {
    return {
      label: "Done",
      badge:
        "border-signal/30 bg-signal/10 text-signal",
    };
  }
  if (s === "in_progress" || cell.includes("🟡")) {
    return {
      label: "In progress",
      badge:
        "border-warn/40 bg-warn/10 text-warn",
    };
  }
  if (s === "pending" || cell.includes("⏳")) {
    return {
      label: "Pending",
      badge:
        "border-border bg-muted/40 text-muted-foreground",
    };
  }
  if (s === "blocked" || cell.includes("🚧")) {
    return {
      label: "Blocked",
      badge:
        "border-alarm/40 bg-alarm/10 text-alarm",
    };
  }
  if (s === "planned" || cell.includes("📋")) {
    return {
      label: "Planned",
      badge:
        "border-violet/40 bg-violet/10 text-violet",
    };
  }
  return {
    label: cell.trim() || "Unknown",
    badge:
      "border-border bg-muted/30 text-muted-foreground",
  };
}
