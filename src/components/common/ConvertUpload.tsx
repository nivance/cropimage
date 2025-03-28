"use client";

import { useState, useCallback, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Link as LinkIcon } from 'lucide-react';
import { config } from '@/lib/config';
import { useTranslations } from 'next-intl';

interface ConvertUploadProps {
  onFileSelect: (file: File | string) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  supportedFormats?: string;
  uploadText?: string;
  uploadRef?: React.RefObject<HTMLDivElement>;
}

const ConvertUpload = forwardRef<HTMLDivElement, ConvertUploadProps>(({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 10485760, // 10MB
  uploadText,
}, ref) => {
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState('local');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxSize: maxFileSize,
    multiple: false
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onFileSelect(urlInput);
    }
  };

  const t = useTranslations('home');

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-md p-24 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <CloudUpload className="h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg font-medium text-gray-700">{uploadText}</p>
        </div>
      </div>
    </div>
  );
});

ConvertUpload.displayName = 'ConvertUpload';

export default ConvertUpload;
