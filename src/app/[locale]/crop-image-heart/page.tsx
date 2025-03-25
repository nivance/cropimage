"use client";

import { useState } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageCropper from '@/components/image-tools/ImageCropper';
import StepsSection from '@/components/common/StepsSection';
import FaqSection from '@/components/common/FaqSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import AboutSection from '@/components/common/AboutSection';
import { createObjectURL } from '@/lib/utils/imageUtils';

export default function HeartCropPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      title: "Adjust heart crop",
      description: "Position your image within the heart shape by dragging it. Zoom in or out to get the perfect framing for your heart-shaped image."
    },
    {
      number: 3,
      title: "Fine-tune settings",
      description: "Adjust the rotation, select output format, and make any final adjustments to get your perfect heart-shaped image."
    },
    {
      number: 4,
      title: "Save your image",
      description: "Click the \"Crop Image\" button to download your heart-shaped image. The result will be a high-quality image with a heart shape."
    }
  ];

  const faqs = [
    {
      question: "What can I use heart-shaped images for?",
      answer: "Heart-shaped images are perfect for romantic occasions like Valentine's Day cards, wedding invitations, anniversary celebrations, couple photos, social media posts, scrapbooking, and creative photography projects that want to convey love and affection."
    },
    {
      question: "Will my heart-shaped image have a transparent background?",
      answer: "Yes, when you save your heart-shaped image in PNG format, the areas outside the heart will be transparent. This allows you to place your heart image on any background without showing rectangular corners."
    },
    {
      question: "Can I adjust the position of the heart on my image?",
      answer: "Absolutely! You can drag your image to position the heart exactly where you want it, ensuring the most important parts of your image are framed within the heart shape."
    },
    {
      question: "Can I use this tool for professional projects?",
      answer: "Yes, our heart-shaped image cropper produces high-quality results suitable for both personal and professional use. The images can be used in digital design, social media marketing, greeting cards, or any creative project that requires heart shapes."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Heart Shape Image Cropper
          </h1>
          <p className="text-gray-600">
            Create beautiful heart-shaped images for Valentine's Day, anniversaries,
            weddings, or any romantic occasion. Our free online heart shape cropper
            turns your photos into lovely heart-shaped images in seconds.
          </p>
        </div>

        {imageUrl ? (
          <ImageCropper
            imageSrc={imageUrl}
            onCancel={handleCropCancel}
            cropShape="rect" // We'll apply heart shape in processing
            aspectRatio={1}
          />
        ) : (
          <FileUpload
            onFileSelect={handleFileSelect}
            supportedFormats="JPG, PNG, BMP"
            uploadText="Drop your image here to crop into a heart shape"
          />
        )}
      </div>

      <StepsSection steps={cropSteps} className="mt-12" />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="About Our Heart Shape Image Cropper"
        description="Our heart-shaped image cropper lets you easily transform your photos into beautiful heart shapes. Perfect for romantic occasions, social media posts, or creative projects that need a touch of love. Simply upload your image, adjust the position, and download your heart-shaped photo in seconds."
      />
    </div>
  );
}
