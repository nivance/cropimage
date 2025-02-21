import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from "@/lib/config";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/contact-us`;
  const t = await getTranslations('metadata');
  return {
    title: 'Contact Us | freeunblocked.games',
    description: 'freeunblocked.games Contact Us',
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
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-5 md:px-10">
          <div className="flex h-auto min-w-[80%] flex-col items-center justify-end py-6 md:h-64">
            <div className="flex flex-col items-center gap-y-4 py-5">
              <h1 className="text-3xl font-bold md:text-5xl">Contact Us</h1>
              <p className="text-sm text-[#808080] sm:text-base">Last Updated as of  January 25, 2025</p>
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
                      <p className="text-base">Need assistance? We're available to help!</p>
                      <p className="text-base">In case you have any inquiries, comments, or proposals on how we can improve our platform, don't hesitate to contact us. You can drop us a line at fannytomy9@gmail.com, and we'll make every effort to reply promptly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-20'></div>
          </div>
        </div>
      </section>
    </>
  );
};