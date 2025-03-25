"use client";

import { useState } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageConverter from '@/components/image-tools/ImageConverter';
import StepsSection from '@/components/common/StepsSection';
import FaqSection from '@/components/common/FaqSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import AboutSection from '@/components/common/AboutSection';
import FeatureSection from '@/components/common/FeatureSection';
import { Crop, Zap, Shield } from 'lucide-react';

export default function WebpToJpgPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | string) => {
    if (typeof file !== 'string') {
      setUploadedFile(file);
    }
  };

  const handleConversionComplete = () => {
    // Reset state after successful conversion if needed
  };

  const handleCancel = () => {
    setUploadedFile(null);
  };

  const conversionSteps = [
    {
      number: 1,
      title: "Upload WEBP File",
      description: "Upload your WEBP file by clicking the \"Choose File\" button or dragging the file into the upload area."
    },
    {
      number: 2,
      title: "Wait for File Conversion",
      description: "Conversion will proceed based on the image size progress bar."
    },
    {
      number: 3,
      title: "Download Your JPG Image",
      description: "Click the \"Download JPG\" button to get the converted image, ensuring the original image quality is maintained."
    }
  ];

  const features = [
    {
      icon: <Crop className="h-8 w-8 text-blue-500" />,
      title: "Free Conversion",
      description: "Convert your WEBP files into corresponding JPG images."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast Processing",
      description: "Efficient online conversion, quickly generating JPG files."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Safe and Reliable",
      description: "Local processing to protect your privacy."
    }
  ];

  const faqs = [
    {
      question: "How can I convert a WEBP image to JPG online?",
      answer: "You can easily convert a WEBP image to JPG using our free online WEBP to JPG converter tool. Simply upload your WEBP file, select the desired Jpg settings, and download your converted image."
    },
    {
      question: "How do I ensure the quality of the converted JPG image?",
      answer: "Use our online tool to convert your WEBP to JPG while selecting the appropriate resolution and size to maintain image quality. It's fast, simple, and doesn't require any software installation."
    },
    {
      question: "Can I convert multiple WEBP files to JPG at once?",
      answer: "Yes, our free online tool allows you to convert multiple WEBP files to JPG in one go, making it perfect for batch processing."
    },
    {
      question: "How to convert a WEBP logo to JPG for web use?",
      answer: "You can convert your WEBP logo to JPG using our online converter. Just upload your WEBP file, choose the JPG format, and download it for your web use."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Convert WEBP to JPG
          </h1>
          <p className="text-gray-600">
            Quickly convert your WEBP images to JPG format.
            Free online conversion with no software installation required.
            Maintain quality and convert in seconds.
          </p>
        </div>

        {uploadedFile ? (
          <ImageConverter
            file={uploadedFile}
            sourceFormat="WEBP"
            targetFormat="jpeg"
            onConversionComplete={handleConversionComplete}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-white p-10 rounded-md shadow-sm">
            <FileUpload
              onFileSelect={handleFileSelect}
              supportedFormats="WEBP"
              uploadText="Drop your WEBP image here"
            />
          </div>
        )}
      </div>

      <StepsSection
        title="How to Convert WEBP to JPG Online - Simple Steps"
        steps={conversionSteps}
        className="mt-12"
      />

      <FeatureSection features={features} />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="Convert WEBP to JPG Online"
        description="Our online WEBP to JPG converter allows you to quickly and easily convert any WEBP image into a high-quality JPG file. With just a few clicks, you can create stunning JPG images for your web projects, graphics, or personalized designs. No additional software is required, and the entire process happens securely in your browser, ensuring fast and private results. Simply upload your WEBP file, select the desired settings, and convert it into an JPG image within seconds."
      />
    </div>
  );
}
