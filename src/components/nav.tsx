'use client'
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useTranslations } from 'next-intl';
import Search from "@/components/search/search"
import { useState, useRef, useEffect } from 'react';

export default function Nav() {
  const t = useTranslations('nav');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-auto border-gray-300 flex items-center justify-between p-2 px-4" aria-label="Global">
    {/* <nav className="w-auto border-b border-gray-300 flex items-center justify-between p-2 px-4" aria-label="Global"> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-4">
          <a href={`/`} className="flex flex-col items-center" title="block breaker">
            <span className="text-blue-500 font-extrabold font-serif mb-[-0.5rem]" style={{ transform: 'rotate(-8deg)' }}>crop</span>
            <span className="text-blue-500 font-extrabold font-serif" style={{ transform: 'rotate(-8deg)' }}>image</span>
          </a>
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-4 flex-grow justify-start">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              className="font-semibold text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-semibold text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {t('more')} ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
      {/* <div className="flex place-items-end items-center justify-end">
        <Search />
        <LocaleSwitcher />
      </div> */}
    </nav>
  )
}
