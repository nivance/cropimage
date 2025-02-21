import { getTranslations } from 'next-intl/server';

import FAQs from "@/components/faqs";
import Features from "@/components/features";
import HowToPlay from "@/components/how-to-play";
import GameMain from "@/components/game-main";
import GameRelated from "@/components/game-related";
import type { Metadata } from 'next';
import { config } from "@/lib/config"
import { getGameByName } from "@/models/game-service";

export const runtime = "edge";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale : ""}`,
    } 
  };
}

export default async function Page({}) {

  const game = getGameByName("");

  return (
    <>
      <GameMain game={game} />
      {/* <GameRelated game={game}/> */}
      <Features />
      <HowToPlay />
      <FAQs />
    </>
  );
}
