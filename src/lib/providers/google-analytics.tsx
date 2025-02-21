"use client";

import Script from "next/script";
import { config } from "@/lib/config";

const GoogleAnalytics = () => {
  return (
    <>
      {config.googleId ? (
        <>
          <Script strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleId}`}
          />
          <Script id="gtag-init" strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleId}', {
                page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GoogleAnalytics;
