import { getGames } from "@/models/category-service"
import GameCard from "./card-game";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function CategoryPannel (
    { category, limit, showCount, showMore }:
    { category: string, limit: number, showCount: boolean, showMore: boolean }) 
{
    const games = await getGames(limit, category);
    const t = await getTranslations('others');

    return (
        <div className="object-fill w-[80%] mx-auto py-2">
            <div className="mx-auto">
                <div className="flex justify-between items-center bg-gray-300 rounded-lg p-1">
                    <h2 className="mr-2 text-start text-3xl text-orange-600 font-extrabold text-main lg:mt-15 lg:text-heading-4 xl:text-heading-2">{category} {t('games')}</h2>
                    {showMore && <Link href={`/category/${category}`} className="mr-2 text-xl text-blue-600 hover:text-blue-700 hover:font-bold hover:underline">{t('viewMore')} &gt;</Link>}
                </div>
                {showCount && <span className="text-sm text-gray-300">{games.length} {t('gamesInTotal')}</span>}
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:mt-15 lg:grid-cols-4 xl:grid-cols-7">
                    {games.map((game, index) => {
                        return <GameCard key={index} game={game} />;
                    })}
                </div>
            </div>
        </div>
    )
}