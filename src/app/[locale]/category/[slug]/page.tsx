/* eslint-disable import/no-anonymous-default-export */
import CategoryPannel from "@/components/category-pannel";
import TagPannel from "@/components/tag-pannel";
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { slug: string, locale: string }}): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/${params.locale !== "en" ? params.locale + "/category/" : "category/"}${params.slug}`;
  const t = await getTranslations('metadata');
  const title = t("category_title", {"category_name": params.slug});
  const description = t("category_description", {"category_name": params.slug});
  const keywords = t("game_keywords", {"game_name": params.slug + " Games"});
  return {
    title: title,
    description: description,
    keywords: keywords,
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

// eslint-disable-next-line react/display-name
export default async function Page({
  params,
}: {
  params: {
    slug: string;
    locale: string; // 确保 locale 参数也被传递
  };
}) {
  const category = params.slug;
  // const locale = params.locale; 
  const t = await getTranslations('others');


  return (
    <>
      <div className="mx-auto w-[80%] flex items-center justify-start py-8">
        <a href={`/`} className="flex flex-col items-center" title="unblocked games">
          <h1 className="font-bold text-gray-400 hover:text-gray-200">{t('home')}</h1>
        </a>
        <span className="text-gray-400 mx-2">&gt;&gt;</span>
        <span className="text-gray-400">{category} {t('games')}</span>
      </div>
      <CategoryPannel category={category} limit={0} showCount={true} showMore={false} />
      <TagPannel />
    </>
  );
}
