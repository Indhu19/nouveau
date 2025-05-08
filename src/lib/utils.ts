import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
};
