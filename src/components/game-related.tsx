import { getRelatedGames } from "@/models/game-service"
import GameCard from "./card-game";
import Content from "@/components/content";
import { Game } from '@/models/types/game';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { fetchObject } from "@/lib/r2"

export default async function GameRelated({ game }: { game: Game; }) {
    const locale = await getLocale();
    const t = await getTranslations('others');
    const games = await getRelatedGames(game.related);
    const gameDesc = await fetchObject("desc", locale, game.name);
    const gameDescExists = gameDesc[0];
    // 将games平均分为两部分
    const halfIndex = Math.ceil(games.length / 2);
    const firstHalf = games.slice(0, halfIndex);
    const secondHalf = games.slice(halfIndex);

    return (
        <>
            {gameDescExists ? (
                <div className="object-fill w-full mx-auto flex flex-col lg:flex-row lg:items-start mt-4">
                    <div className="w-full lg:w-[15%] grid grid-cols-2 gap-x-3 gap-y-1">
                        {firstHalf.map((game, index) => {
                            return <GameCard key={index} game={game} />;
                        })}
                    </div>
                    <div className="w-full lg:w-[70%] mx-2">
                        <Content game={game} gameDesc={gameDesc[1]} />
                    </div>
                    <div className="w-full lg:w-[15%] grid grid-cols-2 gap-x-3 gap-y-1">
                        {secondHalf.map((game, index) => {
                            return <GameCard key={index} game={game} />;
                        })}
                    </div>
                </div>
            ) : (
                <div className="object-fill w-[80%] mx-auto mt-4">
                    <div className="mx-auto">
                        <div className="">
                            <h2 className="mt-10 text-start text-3xl font-bold text-main lg:mt-15 lg:text-heading-4 xl:text-heading-2">{t('relatedGames')}</h2>
                        </div>
                        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
                            {games.map((game, index) => {
                                return <GameCard key={index} game={game} />;
                            })}
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}