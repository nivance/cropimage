import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';
import { Metadata } from 'next';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  return {
    title: "Convert SVG to PNG for free",
    description: "Quickly convert your SVG images to PNG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.",
    keywords: "Convert SVG to PNG, Image Converter, Convert SVG to PNG Online, SVG to PNG High Quality, Best SVG to PNG Converter",
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale + "/" : ""}convert-svg-to-png`,
    }
  };
}

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="SVG" target="PNG" />
      <WhyChooseUsConverter />
    </div>
  );
}
