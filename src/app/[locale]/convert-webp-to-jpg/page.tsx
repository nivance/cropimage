"use client";

import { useState } from 'react';
import ConvertUpload from '@/components/common/ConvertUpload';
import ImageConverter from '@/components/image-tools/ImageConverter';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import FeatureSection from '@/components/common/FeatureSection';
import { Crop, Zap, Shield } from 'lucide-react';

export default function WebpToJpgPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showConverter, setShowConverter] = useState(false);

  // 处理文件选择
  const handleFileSelect = (files: File[] | string[]) => {
    if (Array.isArray(files) && files.length > 0 && typeof files[0] !== 'string') {
      const fileArray = files as File[];
      setUploadedFiles(fileArray);
      setShowConverter(true); // 显示转换结果区域
    }
  };

  // 处理取消转换
  const handleCancel = () => {
    setUploadedFiles([]);
    setShowConverter(false); // 返回上传界面
  };

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

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Convert WEBP to JPG
          </h1>
          <p className="text-gray-600">
            Quickly convert your WEBP images to JPG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.
          </p>
        </div>

        {/* 根据状态切换显示上传区域或转换结果区域 */}
        {!showConverter ? (
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-md shadow-sm mb-8">
            <ConvertUpload
              onFileSelect={handleFileSelect}
              uploadText="Drop your WEBP images or press here to upload"
            />
          </div>
        ) : (
          <ImageConverter
            files={uploadedFiles}
            targetFormat="jpg"
            onCancel={handleCancel}
          />
        )}
      </div>

      <FeatureSection features={features} />
      <WhyChooseUs />
    </div>
  );
}
