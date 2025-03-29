"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loadImage, cropImage, applyCropMask, createImageFromCanvas, downloadImage } from '@/lib/utils/imageUtils';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageBatchCropperProps {
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

type CropShape = 'rect' | 'circle' | 'heart' | 'square' | 'polygon';
type OutputFormat = 'jpeg' | 'png' | 'webp';

const ImageBatchCropper = ({
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
}: ImageBatchCropperProps) => {
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

  const handleCropComplete = async () => {
    try {
      setLoading(true);

      if (!imageRef.current || !croppedAreaPixels) {
        throw new Error('Image or crop area not available');
      }

      // Create the cropped canvas
      const croppedCanvas = cropImage(
        imageRef.current,
        croppedAreaPixels,
        { horizontal: false, vertical: false },
        rotation
      );

      // Apply mask if needed
      let finalCanvas = croppedCanvas;
      if (selectedShape !== 'rect') {
        finalCanvas = applyCropMask(croppedCanvas, selectedShape);
      }

      // Resize the image if dimensions are set
      if (dimensions.width > 0 && dimensions.height > 0) {
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = dimensions.width;
        resizedCanvas.height = dimensions.height;
        const ctx = resizedCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(finalCanvas, 0, 0, dimensions.width, dimensions.height);
          finalCanvas = resizedCanvas;
        }
      }

      // Get the data URL of the cropped image
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
        className="relative w-full md:w-2/3 h-[600px] bg-gray-100 rounded-md overflow-hidden"
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
        <h2 className="text-xl font-bold text-gray-800 text-center">Crop Settings</h2>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 w-20">Zoom</label>
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
          <label className="text-sm font-medium text-gray-700 w-20">Rotation</label>
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
          <label className="text-sm font-medium text-gray-700">Aspect Ratio</label>
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
            <label className="text-sm font-medium text-gray-700">Output Size</label>
            <span className="text-xs text-gray-500">
              Original: {originalDimensions.width} × {originalDimensions.height}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
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
            <div className="flex items-center space-x-2">
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Crop Shape</label>
          <Select
            value={selectedShape}
            onValueChange={handleShapeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rect">Rectangle</SelectItem>
              <SelectItem value="circle">Circle</SelectItem>
              {/* <SelectItem value="heart">Heart</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="polygon">Hexagon</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Output Format</label>
          <Select
            value={selectedFormat}
            onValueChange={(value: OutputFormat) => setSelectedFormat(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Format" />
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
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          <Button
            onClick={handleCropComplete}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? 'Processing...' : 'Crop Image'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageBatchCropper;
