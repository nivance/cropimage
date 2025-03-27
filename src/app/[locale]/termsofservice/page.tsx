import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from "@/lib/config";
import { removeProtocolFromUrl } from "@/lib/utils";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/termsofservice`;
  const t = await getTranslations('metadata');
  const siteName = removeProtocolFromUrl(config.baseUrl);
  return {
    title: 'TERMS OF SERVICE | ' + siteName,
    description: siteName + ' terms of service',
    keywords: t("keywords"),
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default function Page() {
  const siteName = removeProtocolFromUrl(config.baseUrl);
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-5 md:px-10">
        <div className="flex h-auto min-w-[80%] flex-col items-center justify-end py-6 md:h-64">
          <div className="flex flex-col items-center gap-y-4 py-5">
            <h1 className="text-3xl font-bold md:text-5xl">TERMS OF SERVICE</h1>
            <p className="text-sm text-[#808080] sm:text-base">Last Updated as of March 29, 2025</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl py-6">
          <div className="flex flex-col items-center gap-y-14">
            <div className="flex min-w-full flex-col gap-y-10">
              <div className="flex min-w-full py-4 [border-bottom:1px_solid_rgb(226,_226,_226)] text-center">
                <h6 className="text-base font-bold md:text-lg">GENERAL TERMS & CONDITIONS</h6>
              </div>
              <div className="flex flex-col gap-y-10">
                <div className="flex min-w-full flex-col items-start gap-y-6">
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Introduction</p>
                    <p className="text-sm">Welcome to {siteName}. By accessing our website (<a href={config.baseUrl} className="font-bold underline text-blue-600">{config.baseUrl}</a>), 
                      you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. 
                      If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Website Visitors</p>
                    <p className="text-sm">Like most website operators, <a href={config.baseUrl} className="font-bold underline text-blue-600">{config.baseUrl}</a> collects
                      non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, 
                      language preference, referring site, and the date and time of each visitor request. {siteName}'s purpose in collecting non-personally identifying information 
                      is to better understand how {siteName}'s visitors use its website. From time to time, {siteName} may release non-personally-identifying information 
                      in the aggregate, e.g., by publishing a report on trends in the usage of its website.
                    </p>
                    <p className="text-sm">
                      {siteName} also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and 
                      for users leaving comments on {config.baseUrl} blog posts. {siteName} only discloses logged in user and commenter IP addresses 
                      under the same circumstances that it uses and discloses personally-identifying information as described below.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Aggregated Statistics</p>
                    <p className="text-sm">{siteName} may collect statistics about the behavior of visitors to its website. {siteName} don't display this information publicly or provide it to others, 
                      and {siteName} will not disclose your personally-identifying information.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Cookies</p>
                    <p className="text-sm">To enrich and perfect your online experience, {siteName} uses "Cookies", similar technologies and services provided by others to display personalized 
                      content, appropriate advertising and store your preferences on your computer.
                    </p>
                    <p className="text-sm">A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website 
                      each time the visitor returns. {siteName} uses cookies to help {siteName} identify and track visitors, their usage of {siteName}, and their website 
                      access preferences. {siteName} visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using 
                      {siteName}'s websites, with the drawback that certain features of {siteName}'s websites may not function properly without the aid of cookies.
                    </p>
                    <p className="text-sm">By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to {siteName}'s use of cookies.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Limitations</p>
                    <p className="text-sm">In no event shall {siteName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) 
                      arising out of the use or inability to use the materials on {siteName}'s website.</p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Disclaimer</p>
                    <p className="text-sm">The materials on {siteName}'s website are provided on an 'as is' basis. {siteName} makes no warranties, expressed or implied, 
                      and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
                      fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Affiliate Disclosure</p>
                    <p className="text-sm">This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.</p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Governing Law</p>
                    <p className="text-sm">These terms and conditions are governed by and construed in accordance with the laws of the USA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold">Modifications</p>
                    <p className="text-sm">We may revise these Terms of Service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};