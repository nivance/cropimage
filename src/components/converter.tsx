"use client";

import { useState } from 'react';
import ConvertUpload from '@/components/common/ConvertUpload';
import ImageConverter from '@/components/image-tools/ImageConverter';
import { useTranslations } from 'next-intl';

export default function ImageConverterPage({
  source,
  target,
}: {
  source: string;
  target: string;
}) {
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

  const t = useTranslations('home');
  const h1 = t("convert_h1", {"source": source, "target": target});
  const h1_p = t("convert_h1_p", {"source": source, "target": target});
  const upload_text = t("convert_upload_text", {"source": source});

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {h1}
          </h1>
          <p className="text-gray-600">
            {h1_p}
          </p>
        </div>

        {/* 根据状态切换显示上传区域或转换结果区域 */}
        {!showConverter ? (
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-md shadow-sm mb-8">
            <ConvertUpload
              onFileSelect={handleFileSelect}
              uploadText={upload_text}
            />
          </div>
        ) : (
          <ImageConverter
            files={uploadedFiles}
            targetFormat={target}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
