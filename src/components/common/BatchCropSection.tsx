"use client";

import { useState, useRef } from 'react';
import FileBatchUpload from '@/components/common/FileBatchUpload';
import ImageBatchCropper from '@/components/image-tools/ImageBatchCropper';
import { config } from '@/lib/config';
import { createObjectURL } from '@/lib/utils/imageUtils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

// 定义图片项类型
interface ImageItem {
  id: string;
  file: File | null;
  url: string;
  isSelected: boolean;
}

export default function BatchCropSection() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const uploadRef = useRef<HTMLDivElement>(null);

    // 处理文件选择（可以是多个文件或URL）
    const handleFileSelect = (filesOrUrls: File[] | string[]) => {
        if (filesOrUrls.length === 0) return;

        const newImages: ImageItem[] = [];

        if (typeof filesOrUrls[0] === 'string') {
            // 处理URL上传
            (filesOrUrls as string[]).forEach((url, index) => {
                newImages.push({
                    id: `url-${Date.now()}-${index}`,
                    file: null,
                    url: url,
                    isSelected: index === 0 // 第一个默认选中
                });
            });
        } else {
            // 处理文件上传
            (filesOrUrls as File[]).forEach((file, index) => {
                newImages.push({
                    id: `file-${Date.now()}-${index}`,
                    file: file,
                    url: createObjectURL(file),
                    isSelected: index === 0 // 第一个默认选中
                });
            });
        }

        setImages(newImages);
        setSelectedImageIndex(0); // 选中第一张图片
    };

    const handleCropCancel = () => {
        // 清除所有Object URL以防内存泄漏
        images.forEach(img => {
            if (img.file) URL.revokeObjectURL(img.url);
        });
        setImages([]);
        setSelectedImageIndex(-1);
    };

    // 选择图片进行裁剪
    const handleSelectImage = (index: number) => {
        setSelectedImageIndex(index);
    };

    // 删除单张图片
    const handleDeleteImage = (index: number) => {
        const newImages = [...images];
        // 释放URL
        if (newImages[index].file) URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
        setImages(newImages);
        
        // 调整选中的图片
        if (selectedImageIndex === index) {
            setSelectedImageIndex(newImages.length > 0 ? 0 : -1);
        } else if (selectedImageIndex > index) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    // 处理裁剪完成
    const handleCropComplete = (croppedImageUrl: string) => {
        // 可以实现替换裁剪后的图片或其他逻辑
        console.log("Crop completed:", croppedImageUrl);
    };

    const t = useTranslations('home');

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    {t('batch_h1')}
                </h1>
                <p className="text-gray-600">
                    {t("batch_h1_p")}
                </p>
            </div>

            {images.length === 0 ? (
                <div id="upload-section" className="mb-8">
                    <FileBatchUpload
                        onFileSelect={handleFileSelect}
                        supportedFormats={config.support_formates}
                        uploadText={t('batch_upload_text')}
                        ref={uploadRef}
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* 缩略图预览区域 */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">{t('selected_images')}</h3>
                            <Button 
                                variant="outline"
                                onClick={handleCropCancel}
                                className="text-sm"
                            >
                                {t('cancel')}
                            </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            {images.map((image, index) => (
                                <div 
                                    key={image.id}
                                    className={`relative w-20 h-20 border-2 rounded overflow-hidden cursor-pointer
                                        ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
                                    onClick={() => handleSelectImage(index)}
                                >
                                    <img 
                                        src={image.url} 
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-bl"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteImage(index);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* 裁剪器 */}
                    {selectedImageIndex >= 0 && (
                        <div id="cropper-section">
                            <ImageBatchCropper
                                imageSrc={images[selectedImageIndex].url}
                                onCancel={handleCropCancel}
                                onCropComplete={handleCropComplete}
                                uploadRef={uploadRef}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}