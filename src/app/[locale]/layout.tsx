import '../globals.css';

import { NextIntlClientProvider, useMessages, useLocale } from 'next-intl';
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/lib/providers/theme"
import GoogleAnalytics from "@/lib/providers/google-analytics";
import { localeNames } from "@/i18n/locale";
import { config } from "@/lib/config";


export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  // Using internationalization in Client Components
  const messages = useMessages();
  const locale = useLocale();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {Object.keys(localeNames).map((key: string) => {
          const url = key === 'en' ? config.baseUrl : config.baseUrl + '/'+ key;
          return (
            <link key={key} rel="alternate" hrefLang={key} href={url} />
          )
        })}
        <link rel="alternate" hrefLang="x-default" href={config.baseUrl} />
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8721580939882957"crossOrigin="anonymous"></script> */}
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
            <Nav />
            {props.children}
            <Footer />
          </ThemeProvider>
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
