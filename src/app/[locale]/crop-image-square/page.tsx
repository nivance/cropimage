"use client";

import { useState } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageCropper from '@/components/image-tools/ImageCropper';
import StepsSection from '@/components/common/StepsSection';
import FaqSection from '@/components/common/FaqSection';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import AboutSection from '@/components/common/AboutSection';
import { createObjectURL } from '@/lib/utils/imageUtils';
import { config } from '@/lib/config';

export default function SquareCropPage() {
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
      title: "Adjust square crop",
      description: "The square crop frame will appear automatically. Drag to position it, and use the zoom slider to adjust how much of your image fits in the square."
    },
    {
      number: 3,
      title: "Fine-tune settings",
      description: "Adjust the crop position, zoom level, and rotation if needed. You can also choose your preferred output format."
    },
    {
      number: 4,
      title: "Save your image",
      description: "Click the \"Crop Image\" button to download your square cropped image. The result will maintain the original image quality without any watermarks."
    }
  ];

  const faqs = [
    {
      question: "Why would I need a square cropped image?",
      answer: "Square images are essential for many social media platforms like Instagram posts, profile pictures on various platforms, thumbnails, and album covers. They provide a consistent, clean look and ensure your images display properly across different platforms."
    },
    {
      question: "What's the difference between square cropping and resizing?",
      answer: "Square cropping cuts your image to a perfect 1:1 aspect ratio by removing portions of the image. Resizing, on the other hand, changes the dimensions of the entire image which can lead to distortion. Cropping maintains the image quality while achieving the square format."
    },
    {
      question: "What's the best size for square social media images?",
      answer: "While our tool doesn't restrict the output size, common square image sizes for social media include 1080x1080 pixels for Instagram posts, 1200x1200 pixels for Facebook posts, and 800x800 pixels for Twitter. Our tool preserves the resolution of your original image."
    },
    {
      question: "Can I crop multiple images to square at once?",
      answer: "Currently, our tool processes one image at a time to ensure you get the perfect crop for each individual image. This allows you to precisely control the placement of each square crop."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Square Image Cropper
          </h1>
          <p className="text-gray-600">
            Create perfect square images for Instagram, social media profiles,
            thumbnails, and more. Our free online square crop tool makes it easy
            to crop any image into a perfect square with high quality results.
          </p>
        </div>

        {imageUrl ? (
          <ImageCropper
            imageSrc={imageUrl}
            onCancel={handleCropCancel}
            cropShape="rect"
            aspectRatio={1}
          />
        ) : (
          <FileUpload
            onFileSelect={handleFileSelect}
            supportedFormats={config.support_formates}
            uploadText="Drop your image here to crop into a square"
          />
        )}
      </div>

      <StepsSection steps={cropSteps} className="mt-12" />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="About Our Square Image Cropper"
        description="Our square image cropper is designed to help you create perfect 1:1 aspect ratio images for social media posts, profile pictures, and any platform that requires square images. Simply upload any image, adjust the square position, and download your perfectly cropped square image in seconds."
      />
    </div>
  );
}
