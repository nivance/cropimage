import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;
     // 确保 locale 是字符串类型
     if (typeof locale !== 'string') {
        locale = ''; // 或者你也可以赋值为 routing.defaultLocale
    }
    if (["zh-CN", "zh-TW", "zh-HK"].includes(locale)) {
        locale = "zh";
      }

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});