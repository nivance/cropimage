'use client'
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useState, useRef, useEffect } from 'react';
import { navigation } from '@/lib/config';
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cropDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const convertLinks = navigation.convertMenu;

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(event.target as Node)) {
        setIsCropDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-auto border-gray-300 flex items-center justify-between p-2 px-4" aria-label="Global">
      <div className="flex items-center mr-4">
        <a href={`/`} className="flex items-center mr-2" title="crop image">
          <Image className="h-8" src="/favicon.svg" alt="crop image logo" width={28} height={28} />
        </a>
        <a href={`/`} className="flex flex-col items-center" title="crop image">
          <span className="text-blue-500 font-extrabold font-serif">Crop Image</span>
        </a>
      </div>
      
      {/* 桌面端菜单 */}
      <div className="hidden lg:flex items-center justify-between gap-x-8">
        <div className="flex flex-grow justify-start">
          <Link className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="/">Home</Link>
        </div>
        <div className="flex flex-grow justify-start">
          <Link className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="/batch-crop">Batch Crop</Link>
        </div>
        <div className="flex gap-x-4 flex-grow justify-start">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Convert Image<ChevronDown className="ml-1 h-4 w-4 inline" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {convertLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
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
      
      {/* 移动端菜单按钮 */}
      <div className="flex items-center lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      <div className="flex place-items-end items-center justify-end">
        <LocaleSwitcher />
      </div>
      
      {/* 移动端下拉菜单 */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="absolute top-14 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 shadow-lg py-2"
        >
          <div className="flex flex-col space-y-1 px-4">
            <Link 
              href="/" 
              className="py-2 text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/batch-crop" 
              className="py-2 text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Batch Crop
            </Link>
            
            <div className="py-2">
              <button
                onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center"
              >
                Convert Image
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isCropDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCropDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {convertLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsCropDropdownOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
