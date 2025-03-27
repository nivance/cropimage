import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from "@/lib/config";
import { removeProtocolFromUrl } from "@/lib/utils";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/privacy`;
  const t = await getTranslations('metadata');
  const siteName = removeProtocolFromUrl(config.baseUrl);
  return {
    title: 'Privacy Policy | ' + siteName,
    description: siteName + ' privacy policy',
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
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-5 md:px-10">
          <div className="flex h-auto min-w-[80%] flex-col items-center justify-end py-6 md:h-64">
            <div className="flex flex-col items-center gap-y-4 py-5">
              <h1 className="text-3xl font-bold md:text-5xl">Privacy Policy</h1>
              <p className="text-sm text-[#808080] sm:text-base">Last Updated as of March 29, 2025</p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-5xl py-6">
            <div className="flex flex-col items-center gap-y-14">
              <div className="flex min-w-full flex-col gap-y-10">
                <div className="flex min-w-full [border-bottom:1px_solid_rgb(226,_226,_226)] text-center">
                </div>
                <div className="flex flex-col gap-y-10">
                  <div className="flex min-w-full flex-col items-start gap-y-6">
                    <div className="flex flex-col items-start gap-y-3">
                      <p className="text-sm font-bold">Overview</p>
                      <p className="text-sm">Welcome to <a href={config.baseUrl} className="font-bold underline text-blue-600">{config.baseUrl}</a>. This privacy policy outlines the types of information we collect, how we use it, and the steps we take to ensure your personal information is handled appropriately.</p>
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
                      <p className="text-sm font-bold">Children's Privacy</p>
                      <p className="text-sm">Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-y-3">
                      <p className="text-sm font-bold">Aggregated Statistics</p>
                      <p className="text-sm">{siteName} may collect statistics about the behavior of visitors to its website. {siteName} don't display this information publicly or provide it to others, 
                        and {siteName} will not disclose your personally-identifying information.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-y-3">
                      <p className="text-sm font-bold">Data Sharing</p>
                      <p className="text-sm">{siteName} respects your privacy. We do not share your personal data with any third parties, except as necessary to process your orders or comply with legal requirements.</p>
                    </div>
                    <div className="flex flex-col items-start gap-y-3">
                      <p className="text-sm font-bold">Privacy Policy Changes</p>
                      <p className="text-sm">Although most changes are likely to be minor, {siteName} may change its Privacy Policy from time to time, and in {siteName}'s sole discretion.
                         {siteName} encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy 
                         will constitute your acceptance of such change.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-y-3">
                      <p className="text-sm font-bold">Contact Us</p>
                      <p className="text-sm">If you have any questions, concerns, or feedback about our Privacy Policy, please contact us support@{siteName}. We are committed to addressing your inquiries and will strive to respond as promptly as possible.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};