import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  return {
    title: "Convert HEIC to JPG for free",
    description: "Quickly convert your HEIC images to JPG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.",
    keywords: "Convert HEIC to JPG, Image Converter, Convert HEIC to JPG Online, HEIC to JPG High Quality, Best HEIC to JPG Converter",
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale + "/" : ""}convert-heic-to-jpg`,
    }
  };
}

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="HEIC" target="JPG" />
      <WhyChooseUsConverter />
    </div>
  );
}
