"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loadImage, cropImage, applyCropMask, createImageFromCanvas, downloadImage } from '@/lib/utils/imageUtils';
import { useTranslations } from 'next-intl';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageSrc: string;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
  outputFormat?: 'jpeg' | 'png' | 'webp';
  maxZoom?: number;
  minZoom?: number;
  initialRotation?: number;
  onCropComplete?: (croppedImage: string) => void;
  onCancel?: () => void;
  uploadRef?: React.RefObject<HTMLDivElement>;
}

type CropShape = 'rect' | 'circle' | 'heart' | 'square' | 'polygon' | 'round';
type OutputFormat = 'jpeg' | 'png' | 'webp';

const ImageCropper = ({
  imageSrc,
  aspectRatio = 1,
  cropShape = 'rect',
  outputFormat = 'jpeg',
  maxZoom = 3,
  minZoom = 1,
  initialRotation = 0,
  onCropComplete,
  onCancel,
  uploadRef
}: ImageCropperProps) => {
  const t = useTranslations('home');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(initialRotation);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [selectedShape, setSelectedShape] = useState<CropShape>(cropShape);
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>(outputFormat);
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [previewDimensions, setPreviewDimensions] = useState({ width: 0, height: 0 });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<HTMLDivElement>(null);

  // 重置所有状态的函数
  const resetAllStates = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setSelectedShape('rect');
    setSelectedFormat(outputFormat);
    setSelectedAspectRatio(aspectRatio);
    setCroppedAreaPixels(null);
  }, [aspectRatio, outputFormat]);

  // 修改 loadImageDimensions 函数
  const loadImageDimensions = useCallback(async () => {
    try {
      // 重置所有状态
      resetAllStates();
      
      const img = await loadImage(imageSrc);
      imageRef.current = img;
      // 设置原始尺寸
      setOriginalDimensions({ width: img.width, height: img.height });
      // 初始化预览和输出尺寸
      setDimensions({ width: img.width, height: img.height });
      setPreviewDimensions({ width: img.width, height: img.height });

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
  }, [imageSrc, resetAllStates]);

  // 监听 imageSrc 的变化
  useEffect(() => {
    loadImageDimensions();
  }, [imageSrc, loadImageDimensions]);

  const onCropChange = (crop: { x: number, y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onRotationChange = (rotation: number) => {
    setRotation(rotation);
  };

  const onCropAreaComplete = (croppedArea: CroppedArea, croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
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

  // 添加这些辅助函数到组件内部
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

  const handleCropComplete = async () => {
    try {
      setLoading(true);

      if (!imageRef.current || !croppedAreaPixels) {
        throw new Error('Image or crop area not available');
      }

      // 使用官方推荐的方法裁剪图像
      const croppedCanvas = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false }
      );

      // 应用形状蒙版（如果需要）
      let finalCanvas = croppedCanvas;
      if (selectedShape === 'circle') {
        // 对于圆形/椭圆形状，传入宽高比
        finalCanvas = applyCropMask(croppedCanvas, selectedShape, selectedAspectRatio);
      } else if (selectedShape !== 'rect') {
        finalCanvas = applyCropMask(croppedCanvas, selectedShape);
      }

      // 调整尺寸
      if (dimensions.width > 0 && dimensions.height > 0) {
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = dimensions.width;
        resizedCanvas.height = dimensions.height;
        const ctx = resizedCanvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(finalCanvas, 0, 0, dimensions.width, dimensions.height);
          finalCanvas = resizedCanvas;
        }
      }

      // 获取数据URL
      const mimeType = getMimeType(selectedFormat);
      const dataURL = createImageFromCanvas(finalCanvas, mimeType);

      // Call the onCropComplete callback
      if (onCropComplete) {
        onCropComplete(dataURL);
      }

      // Download the image
      const timestamp = new Date().getTime();
      const filename = `cropped_image_${timestamp}.${selectedFormat}`;
      downloadImage(dataURL, filename);

      setLoading(false);
    } catch (error) {
      console.error('Error completing crop:', error);
      setLoading(false);
    }
  };

  // 修改 handleReset 函数，使用 resetAllStates
  const handleReset = () => {
    resetAllStates();
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
  
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(aspectRatio);
  
  const handleAspectRatioChange = (ratio: number) => {
    setSelectedAspectRatio(ratio);
    
    // 根据宽高比更新预览和输出尺寸
    const currentWidth = previewDimensions.width;
    const newHeight = Math.round(currentWidth / ratio);
    
    setPreviewDimensions(prev => ({
      ...prev,
      height: newHeight
    }));
    
    setDimensions({
      width: currentWidth,
      height: newHeight
    });
  };

  const handleShapeChange = (value: CropShape) => {
    setSelectedShape(value);
    if (value === 'circle') {
      setSelectedAspectRatio(1); // 圆形时强制使用 1:1 比例
    }
  };

  const handleDimensionChange = (type: 'width' | 'height', value: string) => {
    const numValue = parseInt(value) || 0;
    
    // 更新输出尺寸
    const newDimensions = {
      ...dimensions,
      [type]: numValue
    };
    setDimensions(newDimensions);
    
    // 根据宽高比更新另一个维度
    if (selectedAspectRatio && numValue > 0) {
      if (type === 'width') {
        const newHeight = Math.round(numValue / selectedAspectRatio);
        setDimensions(prev => ({ ...prev, height: newHeight }));
        setPreviewDimensions({ width: numValue, height: newHeight });
      } else {
        const newWidth = Math.round(numValue * selectedAspectRatio);
        setDimensions(prev => ({ ...prev, width: newWidth }));
        setPreviewDimensions({ width: newWidth, height: numValue });
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
    <div className="flex flex-col md:flex-row w-full gap-6">
      <div 
        ref={cropperRef}
        className="relative w-full md:w-2/3 bg-gray-100 rounded-md overflow-hidden"
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={selectedAspectRatio}
          cropShape={selectedShape === 'circle' ? 'round' : 'rect'}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
          maxZoom={maxZoom}
          minZoom={minZoom}
        />
      </div>

      <div className="w-full md:w-1/3 p-4 space-y-3 bg-white rounded-md shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 text-center">{t('crop_settings')}</h2>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-20">{t('zoom')}</label>
          <div className="flex-1">
            <Slider
              value={[zoom]}
              min={minZoom}
              max={maxZoom}
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
          <label className="text-sm font-medium text-gray-700">{t('crop_shape')}</label>
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
              {/* <SelectItem value="heart">Heart</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="polygon">Hexagon</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{t('output_format')}</label>
          <Select
            value={selectedFormat}
            onValueChange={(value: OutputFormat) => setSelectedFormat(value)}
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
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              {t('reset')}
            </Button>
          </div>
          <Button
            onClick={handleCropComplete}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? t('processing') : t('crop_image')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
