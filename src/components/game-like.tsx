import { getRandomGames } from "@/models/game-service"
import GameCard from "./card-game";
import { useTranslations } from 'next-intl';

export default function GameLike() {
    const t = useTranslations('others');
    const games = getRandomGames();

    return (
        <div className="object-fill w-[80%] mx-auto mt-4">
            <div className="mx-auto">
                <div className="">
                    <h2 className="mt-10 text-start text-3xl font-bold text-main lg:mt-15 lg:text-heading-4 xl:text-heading-2">{t('youMayAlsoLike')}</h2>
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