import WhyChooseUs from '@/components/common/WhyChooseUs';
import CropSection from '@/components/common/CropSection';
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
      <CropSection />
      <HowToUse area='howToUse'/>
      <WhyChooseUs />
      <FAQs faqInfo='faqInfo' faqs='faqs' faqKeys={['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20']} />
    </div>
  );
}
