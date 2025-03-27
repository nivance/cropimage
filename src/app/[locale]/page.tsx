import FeatureSection from '@/components/common/FeatureSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import FaqSection from '@/components/common/FaqSection';
import StepsSection from '@/components/common/StepsSection';
import AboutSection from '@/components/common/AboutSection';
import CropSection from '@/components/common/CropSection';
import HowToUse from '@/components/how-to-use';
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

  const faqs = [
    {
      question: "What shapes are available for image cropping?",
      answer: "Our tool supports various cropping shapes, including: rectangular crop, circular crop, heart-shaped crop, and hexagonal (polygon) crop. You can freely choose different cropping shapes to make your images more creative and personalized."
    },
    {
      question: "What output formats are available for the cropped images?",
      answer: "The cropped images can be exported in several common formats, including: PNG format (ideal for images requiring transparent backgrounds), JPEG format (perfect for photographs), and WebP format (offering better compression and quality balance). You can choose the most suitable output format based on your specific use case."
    },
    {
      question: "How do I use different shapes to crop images?",
      answer: "It's very simple: 1. Upload your image; 2. Select your desired shape (rectangle, circle, heart, or polygon) from the cropping toolbar; 3. Adjust the crop area size and position; 4. Choose your preferred output format; 5. Click the crop button to download your processed image."
    },
    {
      question: "Why would I need different shaped image crops?",
      answer: "Different cropping shapes serve various purposes: circular crops are perfect for avatars and logos; heart-shaped crops are ideal for couple photos and holiday cards; polygon crops can be used for creative designs; while traditional rectangular crops are suitable for regular photo processing. Choosing the right crop shape can make your images more expressive."
    },
    {
      question: "How do I ensure the quality of the cropped image?",
      answer: "Our tool uses high-quality image processing algorithms to ensure that the cropped image maintains its original clarity. You can choose the appropriate output format: for photos, use JPEG for smaller file sizes, and for images requiring transparent backgrounds or high-quality images, use PNG format."
    },
    {
      question: "Is it suitable for creating social media avatars?",
      answer: "Yes, it is! Our tool provides circular and square cropping options, perfectly compatible with the avatar requirements of major social media platforms. Whether you need a square avatar for LinkedIn or a circular avatar for Twitter, you can easily create them with our tool."
    },
    {
      question: "Does it support batch processing of images?",
      answer: "Currently, we focus on providing the best single image processing experience. This allows you to precisely control the cropping effect of each image, ensuring the best possible results. If you need batch processing, we recommend processing each image individually to ensure the best results."
    }
  ];

  return (
    <div className="min-h-screen py-10">
      <CropSection />
      <HowToUse />
      <WhyChooseUs />
      <FaqSection faqs={faqs} />
      <AboutSection />
    </div>
  );
}
