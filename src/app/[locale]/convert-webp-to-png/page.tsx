import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  return {
    title: "Convert WebP to PNG for free",
    description: "Quickly convert your WEBP images to PNG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.",
    keywords: "Convert WebP to PNG, Image Converter, Convert WebP to PNG Online, WebP to PNG High Quality, Best WebP to PNG Converter",
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale + "/" : ""}convert-webp-to-png`,
    }
  };
}

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="WEBP" target="PNG" />
      <WhyChooseUsConverter />
    </div>
  );
}
