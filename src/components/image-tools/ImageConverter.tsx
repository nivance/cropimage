"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { convertImageFormat, downloadImage, createObjectURL, revokeObjectURL } from '@/lib/utils/imageUtils';
import { saveAs } from 'file-saver';

interface ImageConverterProps {
  file: File;
  sourceFormat: string;
  targetFormat: string;
  onConversionComplete?: (file: File) => void;
  onCancel?: () => void;
}

const ImageConverter = ({
  file,
  sourceFormat,
  targetFormat,
  onConversionComplete,
  onCancel
}: ImageConverterProps) => {
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [conversionTime, setConversionTime] = useState<number | null>(null);
  const [selectedFormat, setSelectedFormat] = useState(targetFormat);

  // Display original image preview
  const originalImageUrl = createObjectURL(file);

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value[0]);
  };

  const handleConvert = async () => {
    try {
      setConverting(true);

      const startTime = performance.now();

      // Convert the image
      const convertedFile = await convertImageFormat(
        file,
        selectedFormat,
        quality / 100 // Quality is a value between 0 and 1
      );

      const endTime = performance.now();
      setConversionTime((endTime - startTime) / 1000); // Convert to seconds

      // Create URL for preview
      if (convertedImageUrl) {
        revokeObjectURL(convertedImageUrl);
      }

      const newUrl = createObjectURL(convertedFile);
      setConvertedImageUrl(newUrl);

      // Call the onConversionComplete callback if provided
      if (onConversionComplete) {
        onConversionComplete(convertedFile);
      }

      setConverting(false);
    } catch (error) {
      console.error('Error converting image:', error);
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedImageUrl) return;

    const extension = selectedFormat.toLowerCase();
    const filename = `converted_image.${extension}`;

    saveAs(convertedImageUrl, filename);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-md shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Original Image */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Original Image ({sourceFormat})</h3>
            <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-[300px]">
              {/* Use unoptimized NextJS Image with alt text */}
              <div className="relative w-full h-full">
                <img
                  src={originalImageUrl}
                  alt="Original image preview"
                  className="max-w-full max-h-full object-contain mx-auto"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Filename: {file.name}<br />
                Size: {Math.round(file.size / 1024)} KB
              </p>
            </div>
          </div>

          {/* Converted Image */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Converted Image ({selectedFormat.toUpperCase()})
            </h3>
            <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-[300px]">
              {convertedImageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={convertedImageUrl}
                    alt="Converted image preview"
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  {converting ? 'Converting...' : 'Converted image will appear here'}
                </div>
              )}
            </div>
            {conversionTime !== null && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Conversion time: {conversionTime.toFixed(3)}s
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Output Format</label>
              <Select
                value={selectedFormat}
                onValueChange={handleFormatChange}
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

            {selectedFormat === 'jpeg' || selectedFormat === 'webp' ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">Quality</label>
                  <span className="text-sm text-gray-500">{quality}%</span>
                </div>
                <Slider
                  defaultValue={[quality]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={handleQualityChange}
                />
              </div>
            ) : null}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <div className="space-x-4">
              {convertedImageUrl && (
                <Button
                  variant="outline"
                  onClick={handleDownload}
                >
                  Download
                </Button>
              )}
              <Button
                onClick={handleConvert}
                disabled={converting}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {converting ? 'Converting...' : 'Convert Image'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageConverter;
