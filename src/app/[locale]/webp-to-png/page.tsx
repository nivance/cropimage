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

export default function WebpToPngPage() {
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
      title: "Download Your PNG Image",
      description: "Click the \"Download PNG\" button to get the converted image, ensuring the original image quality is maintained with full transparency support."
    }
  ];

  const features = [
    {
      icon: <Crop className="h-8 w-8 text-blue-500" />,
      title: "Free Conversion",
      description: "Convert your WEBP files into corresponding PNG images with transparency preserved."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast Processing",
      description: "Efficient online conversion, quickly generating high-quality PNG files."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Safe and Reliable",
      description: "Local processing to protect your privacy with no data sent to servers."
    }
  ];

  const faqs = [
    {
      question: "Why convert WebP to PNG?",
      answer: "Converting WebP to PNG is useful when you need transparency support, better compatibility with older software, or when working with applications that don't support WebP. PNG files are widely supported across all platforms and maintain high image quality with transparency."
    },
    {
      question: "Will I lose image quality when converting from WebP to PNG?",
      answer: "No, our converter maintains the original image quality when converting from WebP to PNG. PNG is a lossless format, so it will preserve all the details and transparency from your original WebP file."
    },
    {
      question: "Can I convert animated WebP files to PNG?",
      answer: "Our tool currently supports converting static WebP images to PNG. For animated WebP files, the conversion will result in a static PNG image of the first frame of the animation."
    },
    {
      question: "What's the difference between PNG and JPG format?",
      answer: "PNG (Portable Network Graphics) supports transparency and is best for images with text, logos, or graphics. It uses lossless compression, resulting in higher quality but larger file sizes. JPG is better for photographs as it uses lossy compression to create smaller files, but doesn't support transparency."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Convert WEBP to PNG
          </h1>
          <p className="text-gray-600">
            Quickly convert your WEBP images to PNG format with transparency preserved.
            Free online conversion with no software installation required.
            Perfect for graphics, logos, and images that need transparency support.
          </p>
        </div>

        {uploadedFile ? (
          <ImageConverter
            file={uploadedFile}
            sourceFormat="WEBP"
            targetFormat="png"
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
        title="How to Convert WEBP to PNG Online - Simple Steps"
        steps={conversionSteps}
        className="mt-12"
      />

      <FeatureSection features={features} />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="Convert WEBP to PNG Online"
        description="Our online WEBP to PNG converter allows you to quickly and easily convert any WEBP image into a high-quality PNG file with transparency preserved. With just a few clicks, you can convert your WebP images to PNG format for better compatibility with applications, software, and platforms that don't support WebP. No additional software is required, and the entire process happens securely in your browser, ensuring your privacy is protected."
      />
    </div>
  );
}
