'use client'
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { navigation } from '@/lib/config';

export default function Nav() {
  const t = useTranslations('nav');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cropDropdownRef = useRef<HTMLDivElement>(null);

  const convertLinks = navigation.convertMenu;
  const cropImageLinks = navigation.cropImageMeun;

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target as Node)) {
        setIsCropDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-auto border-gray-300 flex items-center justify-between p-2 px-4" aria-label="Global">
      <div className="flex items-center justify-between gax-x-12">
        <div className="flex items-center mr-4">
          <a href={`/`} className="flex flex-col items-center" title="block breaker">
            <span className="text-blue-500 font-extrabold font-serif mb-[-0.5rem]" style={{ transform: 'rotate(-8deg)' }}>crop</span>
            <span className="text-blue-500 font-extrabold font-serif" style={{ transform: 'rotate(-8deg)' }}>image</span>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-4 flex-grow justify-start">
          <div className="relative" ref={cropDropdownRef}>
            <button
              onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
              className="font-semibold text-base text-gray-700 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
            >
              {t('crop')}▼
            </button>
            {isCropDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {cropImageLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsCropDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-4 flex-grow justify-start">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-semibold text-base text-gray-600 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              {t('convert')} ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {convertLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex place-items-end items-center justify-end">
        <LocaleSwitcher />
      </div>
    </nav>
  )
}
