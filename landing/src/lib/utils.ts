import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  // More robust date parsing could be added here if needed
  if (isNaN(dateObj.getTime())) {
    // Handle invalid date string if necessary, or return original string
    return typeof date === 'string' ? date : 'Invalid Date'; 
  }
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
