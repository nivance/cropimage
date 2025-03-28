import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  return {
    title: "Convert WebP to JPG for free",
    description: "Quickly convert your WEBP images to JPG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.",
    keywords: "Convert WebP to JPG, Image Converter, Convert WebP to JPG Online, WebP to JPG High Quality, Best WebP to JPG Converter",
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale + "/" : ""}convert-webp-to-jpg`,
    }
  };
}

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="WEBP" target="JPG" />
      <WhyChooseUsConverter />
    </div>
  );
}
