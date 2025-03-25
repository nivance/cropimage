"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false);
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  return (
    <header className="bg-white py-2 px-4 border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="https://ext.same-assets.com/3513905083/1117858943.png"
                alt="CropImage Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex ml-8">
              <ul className="flex space-x-1">
                <li>
                  <Link href="/" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <DropdownMenu open={cropDropdownOpen} onOpenChange={setCropDropdownOpen}>
                    <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                      Crop Shape
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/crop-image-circle">Crop circle shape image</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/crop-image-heart">Crop image heart shape</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/crop-image-creative">Crop image creative shape</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/crop-image-geometricForm">Crop image geometric</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/crop-image-square">Crop image square</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <DropdownMenu open={convertDropdownOpen} onOpenChange={setConvertDropdownOpen}>
                    <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                      Convert Image
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/webp-to-jpg">Convert webp to jpg</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/heic-to-jpg">Convert heic to jpg</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/webp-to-png">Convert webp to png</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/svg-to-png">Convert svg to png</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/to-webp">Convert Images to webp</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <Link href="/about" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <DropdownMenu open={languageDropdownOpen} onOpenChange={setLanguageDropdownOpen}>
              <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                <span className="mr-1">🌐</span>
                English
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
                <DropdownMenuItem>繁體中文</DropdownMenuItem>
                <DropdownMenuItem>日本語</DropdownMenuItem>
                <DropdownMenuItem>한국어</DropdownMenuItem>
                <DropdownMenuItem>हिन्दी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
