import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from "@/lib/config";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `${config.baseUrl}/dmca`;
  const t = await getTranslations('metadata');
  return {
    title: 'DMCA Notice | blockbreaker.im',
    description: 'blockbreaker.im DMCA Notice',
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
              <h1 className="text-3xl font-bold md:text-5xl">DMCA</h1>
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
                      <p className="text-base">We have implemented a procedure to address any concerns regarding potential copyright violations on the Site. If you suspect that any content infringes on copyright laws, we will take immediate action to remove it upon notification.</p>
                      <p className="text-base">To report a claim of copyright infringement, please send a written notice to our center using the contact information provided below. Your notice should include the following information:
                      </p>
                      <ul className='py-3 list-none'>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>Your physical or electronic signature, as the owner of an exclusive right that is allegedly infringed, or as an authorized representative of such an owner.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>Identification of the copyrighted work that you claim has been infringed, or, if there are multiple copyrighted works at a single online site that are covered by a single notification, a representative list of such works at that site.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>Identification of the material that you claim is infringing or is the subject of infringing activity and that should be removed or disabled, as well as information reasonably sufficient to permit us to locate the material.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>Information reasonably sufficient to permit us to contact you, such as your address, telephone number, and email address if available.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>A statement that the information in your notification is accurate and, under penalty of perjury, that you are the owner of an exclusive right that is allegedly infringed or are authorized to act on behalf of such owner.</li>
                        <li className='pl-6 relative before:content-["•"] before:absolute before:left-0 before:top-0 mb-2'>Please note that submitting a false claim of copyright infringement is illegal and may result in legal consequences.</li>
                      </ul>
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