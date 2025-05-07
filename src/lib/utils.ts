import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSnakeCase = (key: string) =>
  key.replace(/([A-Z])/g, "_$1").toLowerCase();


export const getDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };