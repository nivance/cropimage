import WhyChooseUs from '@/components/common/WhyChooseUs';
import BatchCropSection from '@/components/common/BatchCropSection';
import HowToUse from '@/components/how-to-use';
import FAQs from '@/components/faqs';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata(context: { params: { locale: string } }): Promise<Metadata> {
  const { params } = await context;
  const { locale } = await params;
  const t = await getTranslations('metadata');
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    icons: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
    alternates: {
      canonical: `${config.baseUrl}/${locale !== "en" ? locale : ""}`,
    }
  };
}

export default function Home() {
  return (
    <div className="min-h-screen py-10">
      <BatchCropSection />
      <HowToUse />
      <WhyChooseUs />
      <FAQs />
    </div>
  );
}