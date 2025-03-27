"use client";

import { useState, useRef } from 'react';
import FileUpload from '@/components/common/FileUpload';
import ImageCropper from '@/components/image-tools/ImageCropper';
import { config } from '@/lib/config';
import { createObjectURL } from '@/lib/utils/imageUtils';

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

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Free online image cropping tool
                </h1>
                <p className="text-gray-600">
                    Crop, resize and edit your images online for free. No registration required, no watermarks added.
                    Support {config.support_formates} formats with instant processing and high quality output.
                </p>
            </div>

            <div id="upload-section" className="mb-8">
                <FileUpload
                    onFileSelect={handleFileSelect}
                    supportedFormats={config.support_formates}
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