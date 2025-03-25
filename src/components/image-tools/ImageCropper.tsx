"use client";

import { useState, useCallback, useRef } from 'react';
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
}

type CropShape = 'rect' | 'circle' | 'heart' | 'square' | 'polygon';
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
  onCancel
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(initialRotation);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [selectedShape, setSelectedShape] = useState<CropShape>('rect');
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>(outputFormat);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load the image to get its dimensions
  const loadImageDimensions = useCallback(async () => {
    try {
      const img = await loadImage(imageSrc);
      imageRef.current = img;
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }, [imageSrc]);

  // Call loadImageDimensions when component mounts or imageSrc changes
  useState(() => {
    loadImageDimensions();
  });

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

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-[400px] bg-gray-100 rounded-md overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          cropShape={cropShape === 'round' ? 'round' : 'rect'}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
          maxZoom={maxZoom}
          minZoom={minZoom}
        />
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Zoom</label>
          <div className="w-full">
            <Slider
              defaultValue={[zoom]}
              min={minZoom}
              max={maxZoom}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rotation</label>
          <div className="w-full">
            <Slider
              defaultValue={[rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={(value) => setRotation(value[0])}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Crop Shape</label>
            <Select
              value={selectedShape}
              onValueChange={(value: CropShape) => setSelectedShape(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rect">Rectangle</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="heart">Heart</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="polygon">Hexagon</SelectItem>
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
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
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

export default ImageCropper;
