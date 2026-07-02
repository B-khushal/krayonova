import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayText(value: unknown, fallback = "") {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const candidate = record.name ?? record.title ?? record.label ?? record.value;

    if (typeof candidate === "string" || typeof candidate === "number") {
      return String(candidate);
    }
  }

  return fallback;
}
