'use client';

import { useTranslations } from 'next-intl';
import { getRandomGame } from '@/models/game-service';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const t = useTranslations('hero');

  const handlePlayNow = async () => {
    const game = await getRandomGame();
    router.push(game.name);
  };

  return (
    <div className="relative">
      <div className="mx-auto w-[80%] px-4 py-24 text-center sm:px-8 xl:px-0">
        <h1 className="mb-5 font-satoshi text-5xl font-bold text-orange-500 -tracking-[1.6px] lg:text-heading-4 xl:text-heading-2">
          {t('h1')}
        </h1>
        <p className="mx-auto max-w-3xl text-gray-400">
          {t('h1_p')}
        </p>
        <a onClick={handlePlayNow} className="min-w-[180px] mt-12 bg-gray-300 dark:text-gray-900 font-bold text-base py-2 px-2 rounded-full hover:bg-yellow-200 transition duration-300 inline-block hover:shadow-lg transform hover:-translate-y-1">
          <i className="fas fa-play"></i> {t('playNow')}
        </a>
      </div>
    </div>
  );
}
