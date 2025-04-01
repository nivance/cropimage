"use client";

import { useState, useCallback, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { config } from '@/lib/config';
import { useTranslations } from 'next-intl';

interface FileUploadProps {
  onFileSelect: (file: File | string) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  supportedFormats?: string;
  uploadText?: string;
  uploadRef?: React.RefObject<HTMLDivElement>;
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(({
  onFileSelect,
  acceptedFileTypes = 'image/*',
  maxFileSize = 10485760, // 10MB
  supportedFormats = config.support_formates,
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
          border-2 border-dashed rounded-md p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <CloudUpload className="h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg font-medium text-gray-700">{uploadText}</p>
        </div>
      </div>

      <Tabs
        defaultValue="local"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-4"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="local">{t('local_file')}</TabsTrigger>
          <TabsTrigger value="url">{t('image_url')}</TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <input
            type="file"
            id="fileInput"
            accept={acceptedFileTypes}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onFileSelect(e.target.files[0]);
              }
            }}
          />
          <Button
            variant="default"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            {t('choose_image')}
          </Button>
        </TabsContent>
        <TabsContent value="url">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={t('image_url_hint')}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <LinkIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleUrlSubmit}
            >
              {t('load')}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <p className="text-sm text-center text-gray-500 mb-8 mt-4">
        {t('supported_formats')}: {supportedFormats}
      </p>
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
