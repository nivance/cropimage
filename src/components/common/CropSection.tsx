"use client";

import { useState, useRef } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageCropper from '@/components/image-tools/ImageCropper';
import { config } from '@/lib/config';
import { createObjectURL } from '@/lib/utils/imageUtils';
import { useTranslations } from 'next-intl';

export default function CropSection() {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const uploadRef = useRef<HTMLDivElement>(null);

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

    const t = useTranslations('home');

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    {t('h1')}
                </h1>
                <p className="text-gray-600">
                    {t("h1_p")}
                </p>
            </div>

            <div id="upload-section" className="mb-8">
                <FileUpload
                    onFileSelect={handleFileSelect}
                    supportedFormats={config.support_formates}
                    uploadText={t('upload_text')}
                    ref={uploadRef}
                />
            </div>

            {imageUrl && (
                <div id="cropper-section" className="mt-8">
                    <ImageCropper
                        imageSrc={imageUrl}
                        onCancel={handleCropCancel}
                        uploadRef={uploadRef}
                    />
                </div>
            )}
        </div>
    )
}