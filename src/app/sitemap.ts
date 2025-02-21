// import { navigation } from "@/data/config";
import { games } from "@/models/games";
import { config } from "@/lib/config";
import { navigation } from '@/lib/config';
import { localeNames } from "@/i18n/locale";
import { getCategories } from "@/models/category-service";

export const baseUrl = `${process.env.SITE_URL}`

export default async function sitemap() {

  // const multiGameUrls = Object.keys(localeNames).flatMap((key: string) => {
  //   return games.map((game) => {
  //     const multiUrl = key === 'en' ? `${config.baseUrl}/${game.name}` : `${config.baseUrl}/${key}/${game.name}`;
  //     return {
  //       url: multiUrl,
  //       changeFrequency: 'weekly',
  //       priority: 1
  //     };
  //   });
  // });

  const legalUrls = navigation.legal.map((item) => ({
    url: `${config.baseUrl}${item.href}`,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  // let routes = ['',].map((route) => ({
  //   url: `${baseUrl}${route}`,
  //   lastModified: new Date().toISOString().split('T')[0],
  //   changeFrequency: 'weekly',
  //   priority: 0.8
  // }))

  // let tags = getTags().map((tag) => ({
  //   url: `${baseUrl}/tag/${tag.name}`,
  //   lastModified: tag.date,
  //   changeFrequency: 'weekly',
  //   priority: 0.8
  // }))

  // const categoryUrls = (await getCategories()).map((category: string) => {
  //   const url = `${config.baseUrl}/category/${category}`;
  //   return {
  //     url: url,
  //     changeFrequency: 'weekly',
  //     priority: 0.8
  //   }
  // });

  return [...legalUrls, ]
}
