"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ConvertUploadProps {
  onFileSelect: (files: File[] | string[]) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  uploadText?: string;
}

const ConvertUpload = ({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 10485760, // 10MB
  uploadText = 'Drop your images or press here to upload'
}: ConvertUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxSize: maxFileSize,
    multiple: true
  });

  const t = useTranslations('home');
  const upload_hint = t("convert_upload_hint");

  return (
    <div
      {...getRootProps()}
      className={`
        max-w-3xl mx-auto border-2 border-dashed rounded-md p-20 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <CloudUpload className="h-12 w-12 text-blue-500 mb-4" />
        <p className="text-lg font-medium text-gray-700">{uploadText}</p>
        <p className="text-sm text-gray-500 mt-2">
          {upload_hint}
        </p>
      </div>
    </div>
  );
};

export default ConvertUpload;
