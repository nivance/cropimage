"use client";

import { useState, useRef } from 'react';
import FileUpload from '@/components/common/FileUpload';
import FeatureSection from '@/components/common/FeatureSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import FaqSection from '@/components/common/FaqSection';
import StepsSection from '@/components/common/StepsSection';
import AboutSection from '@/components/common/AboutSection';
import ImageCropper from '@/components/image-tools/ImageCropper';
import { createObjectURL } from '@/lib/utils/imageUtils';
import { Metadata } from 'next';
// import { getTranslations } from 'next-intl/server';
import { config } from '@/lib/config';

export const runtime = "edge";

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: string };
// }): Promise<Metadata> {
//   const t = await getTranslations({ locale, namespace: "metadata" });
//   return {
//     title: t("title"),
//     description: t("description"),
//     keywords: t("keywords"),
//     icons: [
//       {
//         rel: 'icon',
//         url: '/favicon.ico',
//       },
//     ],
//     alternates: {
//       canonical: `${config.baseUrl}/${locale !== "en" ? locale : ""}`,
//     } 
//   };
// }

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File | string) => {
    if (typeof file === 'string') {
      // Handle URL upload
      setImageUrl(file);
      setUploadedFile(null);
    } else {
      // Handle file upload
      setUploadedFile(file);
      setImageUrl(createObjectURL(file));
    }
  };

  const handleCropCancel = () => {
    setUploadedFile(null);
    setImageUrl(null);
  };

  const cropSteps = [
    {
      number: 1,
      title: "Upload an image",
      description: "Upload your image by clicking the \"Choose Image\" button or simply drag and drop your file into the upload area. You can also paste an image URL if you prefer."
    },
    {
      number: 2,
      title: "Adjust crop area",
      description: "Use the crop frame to select the area you want to keep. You can drag the corners to resize or input exact dimensions in the settings panel."
    },
    {
      number: 3,
      title: "Fine-tune settings",
      description: "Adjust the crop dimensions and position using the control panel. You can enter precise values for width, height, and position."
    },
    {
      number: 4,
      title: "Save your image",
      description: "Click the \"Crop Image\" button to download your cropped image. The result will maintain the original image quality without any watermarks."
    }
  ];

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
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Free Online Image Cropper Tool
          </h1>
          <p className="text-gray-600">
            Crop, resize and edit your images online for free. No registration required, no watermarks added.
            Support {config.support_formates} formats with instant processing and high quality output.
          </p>
        </div>

        <div id="upload-section" className="mb-8">
          <FileUpload
            onFileSelect={handleFileSelect}
            supportedFormats={config.support_formates}
            ref={uploadRef}
          />
        </div>

        {imageUrl && (
          <div id="cropper-section" className="mt-8">
            <ImageCropper
              imageSrc={imageUrl}
              onCancel={handleCropCancel}
              uploadRef={uploadRef}
            />
          </div>
        )}
      </div>

      <StepsSection steps={cropSteps} className="mt-12" />

      <FeatureSection />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection />
    </div>
  );
}
