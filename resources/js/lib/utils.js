import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function isFormValid(data) {
    return Object.entries(data)
        .filter(([key]) => key !== "id")
        .every(([, v]) => v !== null && v !== undefined && v !== "");
}

  export function formatDateForInput(dateString) {
        return dateString.split("T")[0];
    };
