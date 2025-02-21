/* eslint-disable import/no-anonymous-default-export */
import GameLike from "@/components/game-like";
import TagPannel from "@/components/tag-pannel";
import { getGameByName } from "@/models/game-service";
import GameMain from "@/components/game-main";
import { config } from "@/lib/config";
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import GameRelated from "@/components/game-related";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: { slug: string, locale: string }}): Promise<Metadata> {
  const game = getGameByName(params.slug);
  const canonicalUrl = `${config.baseUrl}/${params.locale !== "en" ? params.locale + "/" : ""}${params.slug}`;
  const t = await getTranslations('metadata');
  const title = t("game_title", {"game_name": game?.title || ""});
  const description = t("game_description", {"game_name": game?.title || ""});
  const keywords = t("game_keywords", {"game_name": game?.title || ""});
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
export default async function ({
  params,
}: {
  params: {
    slug: string;
    locale: string;
  };
}) {
  const name = params.slug;
  const game = getGameByName(name);
  if (!game) {
    return redirect('/'); // Redirect to 404 page
  }

  return (
    <>
      <main>
        <GameMain game={game}/>
        <GameRelated game={game}/>
        <GameLike/>
        <TagPannel />
      </main>
    </>
  );
}
