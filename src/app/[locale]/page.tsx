import WhyChooseUs from '@/components/common/WhyChooseUs';
import AboutSection from '@/components/common/AboutSection';
import CropSection from '@/components/common/CropSection';
import HowToUse from '@/components/how-to-use';
import FAQs from '@/components/faqs';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { config } from '@/lib/config';

export const runtime = "edge";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
      <CropSection />
      <HowToUse />
      <WhyChooseUs />
      <FAQs />
      <AboutSection />
    </div>
  );
}
