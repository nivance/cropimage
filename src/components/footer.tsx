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

  return (
    <footer className="border-spacing-0 border-t border-gray-200 px-6 py-4">
      {/* <div className="max-w-xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-0 pb-4 justify-items-center">
        {Object.keys(localeNames).map((key: string) => {
          return (
            <Button key={key} onClick={() => handleChange(key)} className="text-xs m-0 whitespace-nowrap hover:underline hover:text-blue-500 hover:scale-105">{localeNames[key]}</Button>
          )
        })}
      </div> */}
      {/* <div className="mx-auto mb-4 flex max-w-[80%] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-2">
        {navigation.quickMenu.map((item) => {
          return (
            <Link key={item.name} href={`${item.href}`} className="text-sm leading-6 whitespace-nowrap hover:underline hover:text-blue-500">
              {item.name}
            </Link>
          );
        })}
      </div> */}
      <div className="flex justify-center items-center gap-4">
        <p className="font-inter text-sm pr-20">
          © Copyright { new Date().getFullYear() } {" "}
          <a href={config.baseUrl} target="_blank"
            className="text-gray-500 hover:underline hidden md:inline-block"
          >
            {siteName}
          </a>{" "}All rights reserved.
        </p>
        <ul role="list" className="flex justify-between">
          {navigation.legal.map((item) => {
            return (
              <li key={item.name} className="flex items-center">
                <Separator
                  orientation="vertical"
                  className="h-5 mx-2"
                />
                <Link href={`${item.href}`} className="text-sm leading-6 whitespace-nowrap hover:underline hover:text-blue-500">
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}