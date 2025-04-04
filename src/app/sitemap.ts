import { config } from "@/lib/config";
import { navigation } from '@/lib/config';
import { localeNames } from "@/i18n/locale";

export const baseUrl = `${process.env.SITE_URL}`

export default async function sitemap() {

  const convertMenuUrls = Object.keys(localeNames).flatMap((key: string) => {
    return navigation.convertMenu.map((item) => {
      const multiUrl = key === 'en' ? `${config.baseUrl}${item.href}` : `${config.baseUrl}/${key}${item.href}`;
      return {
        url: multiUrl,
        changeFrequency: 'weekly',
        priority: 1
      };
    });
  });

  const cropMenuUrls = Object.keys(localeNames).flatMap((key: string) => {
    return navigation.cropMenu.map((item) => {
      const multiUrl = key === 'en' ? `${config.baseUrl}${item.href}` : `${config.baseUrl}/${key}${item.href}`;
      return {
        url: multiUrl,
        changeFrequency: 'weekly',
        priority: 1
      };
    });
  });

  const legalUrls = navigation.legal.map((item) => ({
    url: `${config.baseUrl}${item.href}`,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  return [...legalUrls, ...convertMenuUrls, ...cropMenuUrls]
}
