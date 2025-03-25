"use client";

import { useState } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageCropper from '@/components/image-tools/ImageCropper';
import StepsSection from '@/components/common/StepsSection';
import FaqSection from '@/components/common/FaqSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import AboutSection from '@/components/common/AboutSection';
import { createObjectURL } from '@/lib/utils/imageUtils';

export default function CreativeCropPage() {
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
      title: "Adjust creative crop",
      description: "Position your image and choose from our various creative shape options. Get creative with different frame shapes for your image."
    },
    {
      number: 3,
      title: "Fine-tune settings",
      description: "Adjust the rotation, select output format, and make any final adjustments to perfect your creatively-shaped image."
    },
    {
      number: 4,
      title: "Save your image",
      description: "Click the \"Crop Image\" button to download your custom-shaped image. The result will be a high-quality image with your chosen creative shape."
    }
  ];

  const faqs = [
    {
      question: "What creative shapes are available?",
      answer: "Our creative shape tool offers a variety of unique shapes including stars, speech bubbles, thought bubbles, arrows, and custom shapes. These shapes help you create visually interesting images for social media, presentations, marketing materials, and more."
    },
    {
      question: "Can I customize the creative shapes?",
      answer: "Yes, you can adjust the position of your image within the shape frame. While we offer pre-designed shapes, the positioning flexibility lets you create a unique look for each image you process."
    },
    {
      question: "Which file format is best for creative-shaped images?",
      answer: "PNG is usually the best format for creative-shaped images because it preserves transparency, allowing your shaped image to be placed on any background without showing rectangular borders. However, you can also save in JPG or WebP formats if needed."
    },
    {
      question: "How can I use creative-shaped images?",
      answer: "Creative-shaped images are perfect for social media posts, digital scrapbooking, presentation slides, marketing materials, greeting cards, and anywhere you want to add visual interest beyond standard rectangular photos."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Creative Shape Image Cropper
          </h1>
          <p className="text-gray-600">
            Transform your images with unique creative shapes. Make your photos stand out
            with custom shapes for social media, presentations, marketing, and more.
          </p>
        </div>

        {imageUrl ? (
          <ImageCropper
            imageSrc={imageUrl}
            onCancel={handleCropCancel}
            cropShape="rect" // We'll apply creative shape in processing
            aspectRatio={1}
          />
        ) : (
          <FileUpload
            onFileSelect={handleFileSelect}
            supportedFormats="JPG, PNG, BMP"
            uploadText="Drop your image here to apply creative shapes"
          />
        )}
      </div>

      <StepsSection steps={cropSteps} className="mt-12" />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="About Our Creative Shape Image Cropper"
        description="Our creative shape image cropper lets you transform ordinary photos into eye-catching visuals with unique shapes. Perfect for social media content, marketing materials, and creative projects that need to stand out from the crowd. Simply upload your image, choose a creative shape, adjust the position, and download your custom-shaped photo in seconds."
      />
    </div>
  );
}
