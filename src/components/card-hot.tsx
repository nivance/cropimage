import { Game } from '@/models/types/game';
import Link from 'next/link';
import { shuffleArray } from '@/lib/utils'; 

export default function HotCard({ games }: { games: Game[] }) {
    // 生成一个随机顺序的 games 数组
    const shuffledGames = shuffleArray([...games]); 

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {shuffledGames.map((game) => {
                const tag_svg = "/images/icon/"+game.type+".svg";
                return (
                    <div key={game.name} className="group cursor-pointer">
                        <Link key={game.name} href={`/${game.name}`} className="relative flex flex-col overflow-hidden rounded bg-card transition duration-300 hover:scale-105 hover:opacity-80">
                            <img
                                src={game.image}
                                alt={game.title}
                                loading="lazy"
                                className="absolute left-0 top-0 aspect-[16/9] w-full overflow-hidden rounded bg-cover bg-center"
                            />
                            <div className="relative overflow-hidden rounded">
                                <img src={game.image} alt={game.title} loading="lazy" className="aspect-[16/9] w-full object-contain" />
                            </div>
                            <p className="py-2 text-center text-xs font-300 whitespace-nowrap">{game.title}</p>
                            <img src={tag_svg} alt="freeunblocked.games featured" className="absolute -left-[2px] top-0 h-4" />
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}