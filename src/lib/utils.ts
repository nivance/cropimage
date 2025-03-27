import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * 从URL中移除协议部分（如 https:// 或 http://）
 * @param url 输入的完整URL
 * @returns 移除协议后的URL
 */
export function removeProtocolFromUrl(url: string): string {
  return url.replace(/^https?:\/\//, '');
}
