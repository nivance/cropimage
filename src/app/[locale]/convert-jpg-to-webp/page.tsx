import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  return {
    title: "Convert JPG to WEBP for free",
    description: "Quickly convert your JPG images to WEBP format. Free online conversion with no software installation required. Maintain quality and convert in seconds.",
    keywords: "Convert JPG to WEBP, Image Converter, Convert JPG to WEBP Online, JPG to WEBP High Quality, Best JPG to WEBP Converter",
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale + "/" : ""}convert-JPG-to-WEBP`,
    }
  };
}

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="JPG" target="WEBP" />
      <WhyChooseUsConverter />
    </div>
  );
}
