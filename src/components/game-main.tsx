'use client';
import Share from "@/lib/providers/share";
import Image from "next/image";
import { Game } from '@/models/types/game';
import { useTranslations } from 'next-intl';

export default function GameMain({ game }:{ game: Game; }) {
  const gameSrc = game.src;

  const enterFullScreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  const t = useTranslations('others');

  return (
    <div className="h-auto p-4">
      {/* <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-2"> */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative mx-auto w-[65%]">
            <iframe
              id="game-iframe"
              src={gameSrc}
              className="w-full h-[500px] rounded-lg shadow-2xl"
            />
            <button
              className="absolute bottom-1 right-2 bg-gray-600 bg-opacity-60 text-white border-none py-1 px-1 rounded cursor-pointer text-base transition duration-300 hover:bg-opacity-80 flex items-center"
              onClick={enterFullScreen}
            >
             <Image src="/icon/fullscreen.svg" width={16} height={16} alt="blockbreaker.im fullscreen" className="h-6 w-6 inline-block filter invert" />
             &nbsp;&nbsp;{t('fullScreen')}
            </button>
          </div>
          <Share game={game} />
        </div>
      {/* </div> */}
    </div>
  );
}
