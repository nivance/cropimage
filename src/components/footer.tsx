'use client';
import Link from "next/link";
import { config } from "@/lib/config";
import { localeNames } from "@/i18n/locale";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import { navigation } from '@/lib/config';
import { Separator } from '@/components/ui/separator'
import { removeProtocolFromUrl } from "@/lib/utils";
import Image from "next/image";


export default function Footer() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const siteName = removeProtocolFromUrl(config.baseUrl);

  const handleChange = (value: string) => {
    if (value !== locale) {
      let newPathName = pathname.replace(`/${locale}`, `/${value}`);
      if (!newPathName.startsWith(`/${value}`)) {
        newPathName = `/${value}${newPathName}`;
      }
      router.push(newPathName);
      router.refresh();
    }
  };

  const quickMenu = navigation.cropMenu.concat(navigation.convertMenu)

  return (
    <footer className="border-spacing-0 border-t border-gray-200 px-6 py-4">
      <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand Column */}
        <div className="flex flex-col space-y-2 justify-center">
          <div className="flex  gap-2">
            <Image className="h-8" src="/favicon.svg" alt="crop image logo" width={28} height={28} />
            <span className="text-xl font-semibold text-gray-700">
              Crop Image
            </span>
          </div>
          <p className="text-sm text-gray-500">100% free, no downloads, no registration, unlimited use, no watermarks.</p>
        </div>

        {/* Links Column */}
        <div className="flex flex-col justify-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
            🚀 Quick Menu
          </h3>
          <ul role="list" className="space-y-1 text-sm">
            {quickMenu.map((item) => {
              return (
                <li key={item.name} className="flex items-center">
                  <Separator
                    orientation="vertical"
                    className="h-5 mx-2"
                  />
                  <Link href={`${item.href}`} className="text-sm text-gray-500 whitespace-nowrap hover:underline hover:text-blue-500">
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Legal Column */}
        <div className="justify-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
            📜 Legal
          </h3>
          <ul role="list" className="space-y-1 text-sm">
            {navigation.legal.map((item) => {
              return (
                <li key={item.name} className="flex items-center">
                  <Separator
                    orientation="vertical"
                    className="h-5 mx-2"
                  />
                  <Link href={`${item.href}`} className="text-sm text-gray-500 whitespace-nowrap hover:underline hover:text-blue-500">
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* <div>
          <h3 className="mb-4 text-sm uppercase tracking-wider text-gray-700">
            Friends
          </h3>
        </div> */}
      </div>
      <div className="flex justify-center items-center gap-4">
        <p className="font-inter text-sm pr-20 mt-4">
          © Copyright {new Date().getFullYear()} {" "}
          <a href={config.baseUrl} target="_blank"
            className="text-gray-500 hover:underline hidden md:inline-block"
          >
            {siteName}
          </a>{" "}All rights reserved.
        </p>
      </div>
    </footer>
  );
}