"use client";

import { useState } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageConverter from '@/components/image-tools/ImageConverter';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import FeatureSection from '@/components/common/FeatureSection';
import { Crop, Zap, Shield } from 'lucide-react';
import { config } from '@/lib/config';

export default function ToWebpPage() {
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
      title: "Upload Your Image",
      description: "Upload your JPG, PNG, or other image file by clicking the \"Choose File\" button or dragging the file into the upload area."
    },
    {
      number: 2,
      title: "Adjust WebP Settings",
      description: "Select your preferred quality level for the WebP conversion. Higher quality means larger file size but better image quality."
    },
    {
      number: 3,
      title: "Download Your WebP Image",
      description: "Click the \"Download WebP\" button to get your converted image, enjoying smaller file sizes with excellent quality."
    }
  ];

  const features = [
    {
      icon: <Crop className="h-8 w-8 text-blue-500" />,
      title: "Smaller File Sizes",
      description: "Convert your images to WebP format for up to 30% smaller files than JPG or PNG while maintaining quality."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast Processing",
      description: "Efficient online conversion, quickly generating optimized WebP files for faster website loading."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Safe and Reliable",
      description: "Local processing to protect your privacy with no data sent to servers."
    }
  ];

  const faqs = [
    {
      question: "What is WebP format and why should I use it?",
      answer: "WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images. WebP files are typically 25-35% smaller than comparable JPEG or PNG files with the same visual quality, making your website load faster and use less bandwidth."
    },
    {
      question: "Are WebP images compatible with all browsers?",
      answer: "Most modern browsers including Chrome, Firefox, Edge, and Safari support WebP. For older browsers that don't support WebP, you can implement fallback solutions using HTML picture elements or JavaScript detection."
    },
    {
      question: "Can WebP images have transparency like PNG?",
      answer: "Yes, WebP supports transparency (alpha channel) like PNG but with much smaller file sizes. This makes it ideal for logos, icons, and graphics that need transparency without the large file size of PNG."
    },
    {
      question: "How do I choose the right quality setting for WebP?",
      answer: "For most web uses, a quality setting between 70-85% offers the best balance between file size and visual quality. Use higher settings (85-100%) for important images where quality is critical, and lower settings (50-70%) where file size reduction is more important than preserving all details."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Convert Images to WebP
          </h1>
          <p className="text-gray-600">
            Transform your images into the modern WebP format for smaller file sizes
            and faster website loading. Get the same quality with files up to 30% smaller
            than JPG or PNG.
          </p>
        </div>

        {uploadedFile ? (
          <ImageConverter
            file={uploadedFile}
            sourceFormat={uploadedFile.type.split('/')[1].toUpperCase()}
            targetFormat="webp"
            onConversionComplete={handleConversionComplete}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-white p-10 rounded-md shadow-sm">
            <FileUpload
              onFileSelect={handleFileSelect}
              supportedFormats={config.support_formates}
              uploadText="Drop your image here to convert to WebP"
            />
          </div>
        )}
      </div>

      <FeatureSection features={features} />

      <WhyChooseUs />

    </div>
  );
}
