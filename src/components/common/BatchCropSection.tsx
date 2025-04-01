"use client";

import { useState, useRef } from 'react';
import FileBatchUpload from '@/components/common/FileBatchUpload';
import ImageBatchCropper, { ImageItem } from '@/components/image-tools/ImageBatchCropper';
import { config } from '@/lib/config';
import { createObjectURL } from '@/lib/utils/imageUtils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function BatchCropSection() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [showCropper, setShowCropper] = useState(false);
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
                    url: url
                });
            });
        } else {
            // 处理文件上传
            (filesOrUrls as File[]).forEach((file, index) => {
                newImages.push({
                    id: `file-${Date.now()}-${index}`,
                    file: file,
                    url: createObjectURL(file)
                });
            });
        }

        setImages(newImages);
        setSelectedImageIndex(0);
        setShowCropper(true);
    };

    // 取消裁剪，返回上传界面
    const handleCropCancel = () => {
        // 清除所有Object URL以防内存泄漏
        images.forEach(img => {
            if (img.file) URL.revokeObjectURL(img.url);
        });
        setImages([]);
        setSelectedImageIndex(-1);
        setShowCropper(false);
    };

    // 处理图片删除
    const handleDeleteImage = (index: number) => {
        const newImages = [...images];
        // 释放URL
        if (newImages[index].file) URL.revokeObjectURL(newImages[index].url);
        newImages.splice(index, 1);
        
        if (newImages.length === 0) {
            // 如果删除后没有图片了，返回上传界面
            setImages([]);
            setSelectedImageIndex(-1);
            setShowCropper(false);
        } else {
            setImages(newImages);
            
            // 调整选中的图片
            if (selectedImageIndex === index) {
                setSelectedImageIndex(newImages.length > 0 ? 0 : -1);
            } else if (selectedImageIndex > index) {
                setSelectedImageIndex(selectedImageIndex - 1);
            }
        }
    };

    // 选择图片
    const handleSelectImage = (index: number) => {
        setSelectedImageIndex(index);
    };

    // 更新图片设置
    const handleUpdateImageSettings = (index: number, settings: any) => {
        const newImages = [...images];
        newImages[index] = {
            ...newImages[index],
            settings: settings
        };
        setImages(newImages);
    };

    // 处理裁剪完成
    const handleCropComplete = (croppedImages: string[]) => {
        console.log("All images cropped:", croppedImages.length);
        // 这里可以添加后续处理逻辑，例如上传到服务器等
    };

    const t = useTranslations('home');

    return (
        <div className="mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12">
                    {t('batch_h1')}
                </h1>
                <p className="text-gray-600">
                    {t("batch_h1_p")}
                </p>
            </div>

            {!showCropper ? (
                <div id="upload-section" className="mb-8">
                    <FileBatchUpload
                        onFileSelect={handleFileSelect}
                        supportedFormats={config.support_formates}
                        uploadText={t('batch_upload_text')}
                        ref={uploadRef}
                    />
                </div>
            ) : (
                <ImageBatchCropper
                    images={images}
                    initialSelectedIndex={selectedImageIndex}
                    onCancel={handleCropCancel}
                    onDeleteImage={handleDeleteImage}
                    onSelectImage={handleSelectImage}
                    onUpdateImageSettings={handleUpdateImageSettings}
                    onCropComplete={handleCropComplete}
                    uploadRef={uploadRef}
                />
            )}
        </div>
    );
}