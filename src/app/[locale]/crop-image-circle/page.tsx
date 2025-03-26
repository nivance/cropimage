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

export default function CircleCropPage() {
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
      title: "Adjust circle crop",
      description: "The circular crop frame will appear automatically. Drag to position it, and use the zoom slider to adjust the size of the circle crop."
    },
    {
      number: 3,
      title: "Fine-tune settings",
      description: "Adjust the crop position, zoom level, and rotation if needed. You can also choose your preferred output format."
    },
    {
      number: 4,
      title: "Save your image",
      description: "Click the \"Crop Image\" button to download your circular cropped image. The result will maintain the original image quality without any watermarks."
    }
  ];

  const faqs = [
    {
      question: "Why would I need a circular cropped image?",
      answer: "Circular cropped images are widely used for profile pictures, avatars, logos, and social media profiles. They create a clean, modern, and consistent look across platforms. Circular crops are especially popular for portraits as they naturally frame the subject's face."
    },
    {
      question: "What's the difference between circular cropping and square cropping?",
      answer: "Circular cropping cuts your image into a perfect circle, removing the corners and creating a round shape. Square cropping maintains the rectangular shape with 90-degree corners. Circular crops are ideal for profile pictures and avatars, while square crops are better for posts and general photography."
    },
    {
      question: "Will my circular cropped image have a transparent background?",
      answer: "Yes, when you save your circular cropped image in PNG format, the areas outside the circle will be transparent. This makes it easy to place your circular image on any background without showing square corners."
    },
    {
      question: "Can I adjust the size of the circle crop?",
      answer: "Yes, you can adjust the size of the circle crop by using the zoom slider. This lets you include more or less of your image within the circular frame. You can also drag the image to position the circle exactly where you want it."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Circle Image Cropper
          </h1>
          <p className="text-gray-600">
            Create perfect circular images for your profile pictures, avatars, and logos.
            Our free online circle crop tool makes it easy to crop any image into a perfect circle
            with no watermarks and high quality results.
          </p>
        </div>

        {imageUrl ? (
          <ImageCropper
            imageSrc={imageUrl}
            onCancel={handleCropCancel}
            cropShape="round"
            aspectRatio={1}
          />
        ) : (
          <FileUpload
            onFileSelect={handleFileSelect}
            supportedFormats={config.support_formates}
            uploadText="Drop your image here to crop into a circle"
          />
        )}
      </div>

      <StepsSection steps={cropSteps} className="mt-12" />

      <WhyChooseUs />

      <FaqSection faqs={faqs} />

      <AboutSection
        title="About Our Circle Image Cropper"
        description="Our circle image cropper tool is designed to help you create perfect round images for avatars, profile pictures, and creative projects. Simply upload any image, adjust the circle position, and download your perfectly cropped circular image in seconds."
      />
    </div>
  );
}
