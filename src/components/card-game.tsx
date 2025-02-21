import Link from "next/link";
import Image from "next/image";
import { Game } from '@/models/types/game';

export default function GameCard({ game }: { game: Game }) {
    return (
        <Link key={game.name} href={`/${game.name}`}
            className="relative flex flex-col overflow-hidden rounded-lg transition duration-300 hover:scale-105">
            <Image src={game.image} alt={game.title} loading="lazy" className="rounded-lg w-full object-contain" width={280} height={280} />
            <h3 className="ml-1 mr-1 pt-2 rounded-lg text-center text-sm font-semibold text-main whitespace-nowrap text-ellipsis">{game.title}</h3>
        </Link>
    )
}