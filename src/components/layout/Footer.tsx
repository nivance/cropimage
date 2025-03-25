"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <h5 className="text-gray-700 font-medium mb-4">About Us</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex space-x-4 mt-4">
                <Link href="https://facebook.com/worminone" className="text-blue-500 hover:text-blue-700">
                  <Facebook size={20} />
                </Link>
                <Link href="https://instagram.com/wmin871" className="text-blue-500 hover:text-blue-700">
                  <Instagram size={20} />
                </Link>
                <Link href="https://twitter.com/worminone" className="text-blue-500 hover:text-blue-700">
                  <Twitter size={20} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-gray-700 font-medium mb-4">Tools</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/webp-to-jpg" className="text-gray-600 hover:text-blue-600 text-sm">
                  Convert webp to jpg
                </Link>
              </li>
              <li>
                <Link href="/heic-to-jpg" className="text-gray-600 hover:text-blue-600 text-sm">
                  Convert heic to jpg
                </Link>
              </li>
              <li>
                <Link href="/webp-to-png" className="text-gray-600 hover:text-blue-600 text-sm">
                  Convert webp to png
                </Link>
              </li>
              <li>
                <Link href="/svg-to-png" className="text-gray-600 hover:text-blue-600 text-sm">
                  Convert svg to png
                </Link>
              </li>
              <li>
                <Link href="/to-webp" className="text-gray-600 hover:text-blue-600 text-sm">
                  Convert Images to webp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-gray-700 font-medium mb-4">Friendly Links</h5>
            {/* To be filled with relevant links in the future */}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2024 Image Cropper. All rights reserved.</p>
          <div className="mt-3 md:mt-0">
            <DropdownMenu>
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
    </footer>
  );
};

export default Footer;
