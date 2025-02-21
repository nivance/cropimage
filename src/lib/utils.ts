import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Game } from '@/models/types/game';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleArray = (array: Game[]): Game[] => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // 交换
  }
  return array;
}
