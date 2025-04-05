"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loadImage, applyCropMask, createImageFromCanvas, downloadImage } from '@/lib/utils/imageUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/uis/dialog';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 定义图片项类型
export interface ImageItem {
  id: string;
  file: File | null;
  url: string;
  settings?: CropSettings;
}

// 定义裁剪设置类型
interface CropSettings {
  crop: { x: number, y: number };
  zoom: number;
  rotation: number;
  aspectRatio: number;
  shape: CropShape;
  format: OutputFormat;
  dimensions: { width: number, height: number };
  croppedAreaPixels?: CroppedArea;
}

interface ImageBatchCropperProps {
  images: ImageItem[];
  initialSelectedIndex?: number;
  onCancel?: () => void;
  onCropComplete?: (croppedImages: string[]) => void;
  onDeleteImage?: (index: number) => void;
  onSelectImage?: (index: number) => void;
  onUpdateImageSettings?: (index: number, settings: CropSettings) => void;
  uploadRef?: React.RefObject<HTMLDivElement>;
}

type CropShape = 'rect' | 'circle' | 'heart' | 'square' | 'polygon';
type OutputFormat = 'jpeg' | 'png' | 'webp';

const ImageBatchCropper = ({
  images,
  initialSelectedIndex = 0,
  onCancel,
  onCropComplete,
  onDeleteImage,
  onSelectImage,
  onUpdateImageSettings,
  uploadRef
}: ImageBatchCropperProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(initialSelectedIndex);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [selectedShape, setSelectedShape] = useState<CropShape>('rect');
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>('jpeg');
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [previewDimensions, setPreviewDimensions] = useState({ width: 0, height: 0 });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [thumbnailScrollPosition, setThumbnailScrollPosition] = useState(0);

  const cropperRef = useRef<HTMLDivElement>(null);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  
  const t = useTranslations('home');

  // 重置裁剪设置函数
  const resetCropSettings = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setSelectedShape('rect');
    setSelectedFormat('jpeg');
    setSelectedAspectRatio(1);
    setCroppedAreaPixels(null);
  }, []);

  // 应用已保存的设置或重置
  const applyImageSettings = useCallback((imageIndex: number) => {
    const currentImage = images[imageIndex];
    
    if (currentImage.settings) {
      // 应用已保存的设置
      const settings = currentImage.settings;
      setCrop(settings.crop);
      setZoom(settings.zoom);
      setRotation(settings.rotation);
      setSelectedShape(settings.shape);
      setSelectedFormat(settings.format);
      setSelectedAspectRatio(settings.aspectRatio);
      setDimensions(settings.dimensions);
      setPreviewDimensions(settings.dimensions);
    } else {
      // 重置设置
      resetCropSettings();
    }
  }, [images, resetCropSettings]);

  // 修改 loadImageDimensions 函数
  const loadImageDimensions = useCallback(async () => {
    if (!images.length || selectedImageIndex < 0 || selectedImageIndex >= images.length) {
      return;
    }
    
    try {
      const imageSrc = images[selectedImageIndex].url;
      const img = await loadImage(imageSrc);
      
      // 设置原始尺寸
      setOriginalDimensions({ width: img.width, height: img.height });
      
      // 初始化预览和输出尺寸（如果没有设置）
      if (!images[selectedImageIndex].settings) {
        setDimensions({ width: img.width, height: img.height });
        setPreviewDimensions({ width: img.width, height: img.height });
      }

      // 滚动到裁剪区域
      setTimeout(() => {
        cropperRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, [images, selectedImageIndex]);

  // 监听选中图片的变化
  useEffect(() => {
    if (images.length > 0 && selectedImageIndex >= 0) {
      loadImageDimensions();
      applyImageSettings(selectedImageIndex);
    }
  }, [loadImageDimensions, selectedImageIndex, images, applyImageSettings]);

  // 选择图片
  const handleSelectImage = (index: number) => {
    // 保存当前图片的设置
    if (selectedImageIndex >= 0 && selectedImageIndex < images.length && croppedAreaPixels) {
      saveCurrentImageSettings();
    }
    
    setSelectedImageIndex(index);
    if (onSelectImage) {
      onSelectImage(index);
    }
  };

  // 保存当前图片的设置
  const saveCurrentImageSettings = () => {
    if (selectedImageIndex < 0) return;
    
    const settings: CropSettings = {
      crop,
      zoom,
      rotation,
      aspectRatio: selectedAspectRatio,
      shape: selectedShape,
      format: selectedFormat,
      dimensions,
      croppedAreaPixels: croppedAreaPixels || undefined
    };
    
    if (onUpdateImageSettings) {
      onUpdateImageSettings(selectedImageIndex, settings);
    }
  };

  // 删除图片
  const handleDeleteImage = (index: number) => {
    if (onDeleteImage) {
      onDeleteImage(index);
    }
  };

  // 缩略图滚动控制
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (!thumbnailsContainerRef.current) return;
    
    const container = thumbnailsContainerRef.current;
    const scrollAmount = direction === 'left' ? -200 : 200;
    const newPosition = thumbnailScrollPosition + scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setThumbnailScrollPosition(newPosition);
  };

  const onCropChange = (crop: { x: number, y: number }) => {
    setCrop(crop);
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: selectedShape,
        format: selectedFormat,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: selectedShape,
        format: selectedFormat,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
  };

  const onRotationChange = (rotation: number) => {
    setRotation(rotation);
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom: zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: selectedShape,
        format: selectedFormat,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
  };

  const onCropAreaComplete = (croppedArea: CroppedArea, croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
    
    // 每次裁剪区域完成后，自动保存当前设置
    // 这确保我们总是有最新的裁剪区域像素数据
    if (selectedImageIndex >= 0) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: selectedShape,
        format: selectedFormat,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
  };

  const getMimeType = (format: string): string => {
    switch (format) {
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      default:
        return 'image/jpeg';
    }
  };

  // 添加这些辅助函数到组件外部
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getRadianAngle = (degreeValue: number): number => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);
    return {
      width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  };

  // 这个是根据react-easy-crop官方推荐的裁剪方法
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CroppedArea,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ): Promise<HTMLCanvasElement> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas context is not available');
    }

    // 计算旋转后的尺寸
    const rotated = rotateSize(image.width, image.height, rotation);

    // 设置画布尺寸为旋转后的尺寸
    canvas.width = rotated.width;
    canvas.height = rotated.height;

    // 在画布中心进行旋转
    ctx.translate(rotated.width / 2, rotated.height / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // 绘制原始图像
    ctx.drawImage(image, 0, 0);

    // 提取裁剪区域
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // 设置画布尺寸为裁剪后的尺寸
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // 将裁剪后的图像数据放回画布
    ctx.putImageData(data, 0, 0);

    return canvas;
  };

  // 然后修改 batchCropAllImages 函数
  const batchCropAllImages = async () => {
    try {
      setLoading(true);
      
      // 保存当前图片的设置
      saveCurrentImageSettings();
      
      const croppedResults: string[] = [];
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (!image.settings || !image.settings.croppedAreaPixels) continue;
        
        const settings = image.settings;
        
        // 使用官方推荐的方法裁剪图像
        const croppedCanvas = await getCroppedImg(
          image.url,
          settings.croppedAreaPixels || { x: 0, y: 0, width: 0, height: 0 },
          settings.rotation,
          { horizontal: false, vertical: false }
        );
        
        // 应用形状蒙版（如果需要）
        let finalCanvas = croppedCanvas;
        if (settings.shape === 'circle') {
          // 对于圆形/椭圆形状，传入宽高比
          finalCanvas = applyCropMask(croppedCanvas, settings.shape, settings.aspectRatio);
        } else if (settings.shape !== 'rect') {
          finalCanvas = applyCropMask(croppedCanvas, settings.shape);
        }
        
        // 调整尺寸
        if (settings.dimensions.width > 0 && settings.dimensions.height > 0) {
          const resizedCanvas = document.createElement('canvas');
          resizedCanvas.width = settings.dimensions.width;
          resizedCanvas.height = settings.dimensions.height;
          const ctx = resizedCanvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(finalCanvas, 0, 0, settings.dimensions.width, settings.dimensions.height);
            finalCanvas = resizedCanvas;
          }
        }
        
        // 获取数据URL
        const mimeType = getMimeType(settings.format);
        const dataURL = createImageFromCanvas(finalCanvas, mimeType);
        
        croppedResults.push(dataURL);
        
        // 下载图片
        const timestamp = new Date().getTime();
        const filename = `cropped_image_${i+1}_${timestamp}.${settings.format}`;
        downloadImage(dataURL, filename);
      }
      
      // 完成回调
      if (onCropComplete) {
        onCropComplete(croppedResults);
      }
      
      setLoading(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error completing batch crop:', error);
      
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  // 修改 handleReset 函数
  const handleReset = () => {
    resetCropSettings();
    // 重置尺寸
    setDimensions({ ...originalDimensions });
    setPreviewDimensions({ ...originalDimensions });
  };
  
  // 添加宽高比选项
  const aspectRatios = [
    { value: 16/9, label: '16:9' },
    { value: 1, label: '1:1' },
    { value: 21/9, label: '21:9' },
    { value: 2/3, label: '2:3' },
    { value: 3/2, label: '3:2' },
    { value: 4/5, label: '4:5' },
    { value: 5/4, label: '5:4' },
    { value: 9/16, label: '9:16' },
    { value: 9/21, label: '9:21' }
  ];
  
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(1);
  
  const handleAspectRatioChange = (ratio: number) => {
    setSelectedAspectRatio(ratio);
    
    // 根据宽高比更新预览和输出尺寸
    const currentWidth = previewDimensions.width;
    const newHeight = Math.round(currentWidth / ratio);
    
    setPreviewDimensions(prev => ({
      ...prev,
      height: newHeight
    }));
    
    const newDimensions = {
      width: currentWidth,
      height: newHeight
    };
    
    setDimensions(newDimensions);
    
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: ratio,
        shape: selectedShape,
        format: selectedFormat,
        dimensions: newDimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
    
  };

  const handleShapeChange = (value: CropShape) => {
    setSelectedShape(value);
    
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: value,
        format: selectedFormat,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
    
  };

  const handleDimensionChange = (type: 'width' | 'height', value: string) => {
    const numValue = parseInt(value) || 0;
    
    // 更新输出尺寸
    const newDimensions = {
      ...dimensions,
      [type]: numValue
    };
    
    // 根据宽高比更新另一个维度
    if (selectedAspectRatio && numValue > 0) {
      if (type === 'width') {
        const newHeight = Math.round(numValue / selectedAspectRatio);
        newDimensions.height = newHeight;
        setPreviewDimensions({ width: numValue, height: newHeight });
      } else {
        const newWidth = Math.round(numValue * selectedAspectRatio);
        newDimensions.width = newWidth;
        setPreviewDimensions({ width: newWidth, height: numValue });
      }
    }
    
    setDimensions(newDimensions);
    
    // 防止频繁更新，使用节流
    // 创建一个延迟保存的功能
    const debouncedSave = setTimeout(() => {
      // 自动保存当前设置
      if (selectedImageIndex >= 0 && croppedAreaPixels) {
        const settings: CropSettings = {
          crop,
          zoom,
          rotation,
          aspectRatio: selectedAspectRatio,
          shape: selectedShape,
          format: selectedFormat,
          dimensions: newDimensions,
          croppedAreaPixels
        };
        
        if (onUpdateImageSettings) {
          onUpdateImageSettings(selectedImageIndex, settings);
        }
        
      }
    }, 500); // 500ms 延迟保存
    
    return () => clearTimeout(debouncedSave);
  };

  // 修改格式选择函数，在每次格式改变时自动保存
  const handleFormatChange = (value: OutputFormat) => {
    setSelectedFormat(value);
    
    // 自动保存当前设置
    if (selectedImageIndex >= 0 && croppedAreaPixels) {
      const settings: CropSettings = {
        crop,
        zoom,
        rotation,
        aspectRatio: selectedAspectRatio,
        shape: selectedShape,
        format: value,
        dimensions,
        croppedAreaPixels
      };
      
      if (onUpdateImageSettings) {
        onUpdateImageSettings(selectedImageIndex, settings);
      }
    }
  };

  // 修改 Cancel 按钮的点击处理函数
  const handleCancel = () => {
    // 先触发状态更新
    if (onCancel) {
      onCancel();
    }
    
    // 延迟执行滚动，确保 DOM 已更新
    setTimeout(() => {
      if (uploadRef?.current) {
        // 使用更可靠的滚动方法
        window.scrollTo({
          top: uploadRef.current.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-2">
      {/* 缩略图预览区域 */}
      <div ref={cropperRef} className="bg-white rounded-full">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{t('selected_images')}</h3>
          <Button 
            variant="outline"
            onClick={handleCancel}
            className="text-sm"
          >
            {t('cancel')}
          </Button>
        </div>
        
        <div className="relative">
          {/* 左滚动按钮 */}
          {thumbnailScrollPosition > 0 && (
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
              onClick={() => scrollThumbnails('left')}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}
          
          {/* 缩略图容器 */}
          <div 
            ref={thumbnailsContainerRef}
            className="flex overflow-x-auto py-2 scrollbar-hide" 
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex space-x-3">
              {images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`relative flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden cursor-pointer
                    ${selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'}
                    ${image.settings ? 'ring-2 ring-green-400 ring-opacity-50' : ''}`}
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
                  {image.settings && (
                    <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white text-xs text-center py-0.5">
                      {t('set')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* 右滚动按钮 */}
          {thumbnailsContainerRef.current && 
           thumbnailsContainerRef.current.scrollWidth > thumbnailsContainerRef.current.clientWidth &&
           thumbnailScrollPosition < thumbnailsContainerRef.current.scrollWidth - thumbnailsContainerRef.current.clientWidth && (
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
              onClick={() => scrollThumbnails('right')}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      {/* 裁剪区域 */}
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div 
          className="relative w-full md:w-2/3 h-[480px] bg-gray-100 rounded-md overflow-hidden"
        >
          {images.length > 0 && selectedImageIndex >= 0 && (
            <Cropper
              image={images[selectedImageIndex].url}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={selectedAspectRatio}
              cropShape={selectedShape === 'circle' ? 'round' : 'rect'}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onRotationChange={onRotationChange}
              onCropComplete={onCropAreaComplete}
              maxZoom={3}
              minZoom={1}
            />
          )}
        </div>

        <div className="w-full md:w-1/3 p-2 space-y-2 bg-white rounded-md shadow-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 text-center">{t('crop_settings')}</h2>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-20">{t('zoom')}</label>
            <div className="flex-1">
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 w-20">{t('rotation')}</label>
            <div className="flex-1">
              <Slider
                value={[rotation]}
                min={0}
                max={360}
                step={1}
                onValueChange={(value) => setRotation(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{t('aspect_ratio')}</label>
            <div className="grid grid-cols-3 gap-1">
              {aspectRatios.map((ratio) => (
                <div 
                  key={ratio.label}
                  className={`border rounded-md p-1 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors ${selectedAspectRatio === ratio.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  onClick={() => handleAspectRatioChange(ratio.value)}
                >
                  <div 
                    className={`w-6 h-4 border ${selectedAspectRatio === ratio.value ? 'border-blue-500 bg-blue-500' : 'border-gray-400'} rounded-sm`}
                    style={{
                      aspectRatio: ratio.value.toString(),
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                  <span className="text-xs text-center mt-1">{ratio.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">{t('output_size')}</label>
              <span className="text-xs text-gray-500">
                {t('original')}: {originalDimensions.width} × {originalDimensions.height}
              </span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <div className="flex items-center space-x-1">
                <label className="text-sm text-gray-600">W:</label>
                <input
                  type="number"
                  value={dimensions.width || ''}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Width"
                  min="1"
                />
              </div>
              <span className="text-sm text-gray-500">px</span>
              <div className="flex items-center space-x-1">
                <label className="text-sm text-gray-600">H:</label>
                <input
                  type="number"
                  value={dimensions.height || ''}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Height"
                  min="1"
                />
              </div>
              <span className="text-sm text-gray-500">px</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">{t('crop_shape')}</label>
            <Select
              value={selectedShape}
              onValueChange={handleShapeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('select_shape')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rect">{t('rectangle')}</SelectItem>
                <SelectItem value="circle">{t('circle')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">{t('output_format')}</label>
            <Select
              value={selectedFormat}
              onValueChange={handleFormatChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('select_format')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <div>
              <Button
                variant="outline"
                onClick={handleReset}
              >
                {t('reset')}
              </Button>
            </div>
            <Button
              onClick={() => setShowConfirmDialog(true)}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {loading ? t('processing') : t('crop_image')}
            </Button>
          </div>
        </div>
      </div>

      {/* 确认对话框 */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('confirm_crop')}</DialogTitle>
            <DialogDescription>
              {t('confirm_crop_description')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              {t('no')}
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={batchCropAllImages}
              disabled={loading}
            >
              {loading ? t('processing') : t('sure')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageBatchCropper;
