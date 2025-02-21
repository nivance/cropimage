import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Features() {
    const t = useTranslations('hero');
    return (
        <div className="relative">
            <div className="mx-auto w-[80%] py-12 px-5">
                <h2 className="mb-4 font-satoshi text-3xl font-bold text-center">
                    {t('h2_what')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    {t('h2_what_p1')}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    {t('h2_what_p2')}
                </p>
            </div>
            <div className="mx-auto w-full max-w-7xl px-5 py-8">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mb-4 font-satoshi text-3xl font-bold">{t('h2_features')}</h2>
                    <p className="mb-8 text-base text-gray-500">{t('h2_features_p1')}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector23.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_1')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_1_p')}</p>
                    </div>
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector19.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_2')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_2_p')}</p>
                    </div>
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector25.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_3')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_3_p')}</p>
                    </div>
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector26.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_4')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_4_p')}</p>
                    </div>
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector24.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_5')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_5_p')}</p>
                    </div>
                    <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
                        <Image src="/icon/vector18.svg" alt="" width={64} height={64} className="inline-block object-cover rounded-full dark:invert" />
                        <h3 className="text-xl font-semibold">{t('h3_6')}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t('h3_6_p')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}