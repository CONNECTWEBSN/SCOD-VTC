import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx and tailwind-merge.
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts.
 *
 * @param inputs - Class values (strings, objects, arrays)
 * @returns Merged class string
 *
 * @example
 * cn("px-4 py-2", "bg-blue-500") // "px-4 py-2 bg-blue-500"
 * cn("px-4", { "py-2": true, "bg-red-500": false }) // "px-4 py-2"
 * cn("p-4", "px-6") // "py-4 px-6" (tailwind-merge resolves conflict)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
