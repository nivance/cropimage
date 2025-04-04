"use client";
import { useTranslations } from 'next-intl';

export default function HowToUse({ area } : { area: string }) {
    const t = useTranslations(area);
    return (
        <section className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center justify-center px-5 py-8">
                <p className="font-inter mb-2 text-center text-sm font-medium"> {t('p')} </p>
                <h2 className="text-center text-3xl font-bold lg:text-4xl"> {t('h2')} </h2>
                <p className="font-inter mb-8 mt-4 max-w-lg px-5 text-center text-base font-light text-gray-500">
                    {t('h2_p')}
                </p>
                <div className="flex flex-col items-start justify-center lg:flex-row"> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">1</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8"> {t('h3_1')} </h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_1_p')}</p>
                        </div> 
                        <svg className="absolute -bottom-[48px] left-[28px] lg:hidden dark:invert" width="12" height="70" viewBox="0 0 12 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 94.7735L11.7735 89L6 83.2265L0.226497 89L6 94.7735ZM5 6V10.15H7V6H5ZM5 18.45V26.75H7L7 18.45H5ZM5 35.05L5 43.35H7V35.05H5ZM5 51.65L5 59.95H7L7 51.65H5ZM5 68.25L5 76.55H7L7 68.25H5ZM5 84.85L5 89H7V84.85H5Z" fill="black"></path>
                        </svg> 
                        <svg className="absolute right-0 top-7 hidden lg:block dark:invert" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7h35.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="black" />
                        </svg>
                    </div> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">2</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8"> {t('h3_2')} </h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_2_p')}</p>
                        </div> {/* MOBILE - LINE */}
                        <svg className="absolute -bottom-[48px] left-[28px] lg:hidden dark:invert" width="12" height="70" viewBox="0 0 12 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 94.7735L11.7735 89L6 83.2265L0.226497 89L6 94.7735ZM5 6V10.15H7V6H5ZM5 18.45V26.75H7L7 18.45H5ZM5 35.05L5 43.35H7V35.05H5ZM5 51.65L5 59.95H7L7 51.65H5ZM5 68.25L5 76.55H7L7 68.25H5ZM5 84.85L5 89H7V84.85H5Z" fill="black"></path>
                        </svg> {/* DESKTOP - LINE */} <svg className="absolute right-0 top-7 hidden lg:block dark:invert" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7h35.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="black" />
                        </svg>
                    </div> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">3</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8">{t('h3_3')}</h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_3_p')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center lg:flex-row"> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">4</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8"> {t('h3_4')} </h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_4_p')}</p>
                        </div> {/* MOBILE - LINE */}
                        <svg className="absolute -bottom-[48px] left-[28px] lg:hidden dark:invert" width="12" height="70" viewBox="0 0 12 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 94.7735L11.7735 89L6 83.2265L0.226497 89L6 94.7735ZM5 6V10.15H7V6H5ZM5 18.45V26.75H7L7 18.45H5ZM5 35.05L5 43.35H7V35.05H5ZM5 51.65L5 59.95H7L7 51.65H5ZM5 68.25L5 76.55H7L7 68.25H5ZM5 84.85L5 89H7V84.85H5Z" fill="black"></path>
                        </svg> {/* DESKTOP - LINE */}
                        <svg className="absolute right-0 top-7 hidden lg:block dark:invert" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7h35.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="black" />
                        </svg>
                    </div> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">5</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8"> {t('h3_5')} </h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_5_p')}</p>
                        </div> {/* MOBILE - LINE */}
                        <svg className="absolute -bottom-[48px] left-[28px] lg:hidden dark:invert" width="12" height="70" viewBox="0 0 12 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 94.7735L11.7735 89L6 83.2265L0.226497 89L6 94.7735ZM5 6V10.15H7V6H5ZM5 18.45V26.75H7L7 18.45H5ZM5 35.05L5 43.35H7V35.05H5ZM5 51.65L5 59.95H7L7 51.65H5ZM5 68.25L5 76.55H7L7 68.25H5ZM5 84.85L5 89H7V84.85H5Z" fill="black"></path>
                        </svg> {/* DESKTOP - LINE */} <svg className="absolute right-0 top-7 hidden lg:block dark:invert" width="170" height="12" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM169.773 6L164 0.226497L158.227 6L164 11.7735L169.773 6ZM6 7H9.95V5H6V7ZM17.85 7h35.75V5H17.85V7ZM33.65 7H41.55V5H33.65V7ZM49.45 7H57.35V5H49.45V7ZM65.25 7H73.15V5H65.25V7ZM81.05 7H88.95V5H81.05V7ZM96.85 7H104.75V5H96.85V7ZM112.65 7H120.55V5H112.65V7ZM128.45 7H136.35V5H128.45V7ZM144.25 7H152.15V5H144.25V7ZM160.05 7H164V5H160.05V7Z" fill="black" />
                        </svg>
                    </div> {/* BLOCK */}
                    <div className="relative my-4 flex rounded-md lg:mx-8 lg:flex-col">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-400">
                            <h3 className="text-3xl font-medium">6</h3>
                        </div>
                        <div className="ml-6 lg:ml-0">
                            <h3 className="mb-5 text-xl font-medium lg:mt-8">{t('h3_6')}</h3>
                            <p className="font-inter max-w-md pr-5 text-base text-gray-500">{t('h3_6_p')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}