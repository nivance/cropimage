"use client";

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JSZip from 'jszip';

// 转换结果类型
export interface ConversionResult {
  id: string;
  originalFile: File;
  convertedUrl: string;
  fileName: string;
  conversionTime: number;
}

interface ImageConverterProps {
  files: File[];
  targetFormat: string;
  onConversionComplete?: () => void;
  onCancel: () => void;
}

const ImageConverter = ({
  files,
  targetFormat = 'jpg',
  onConversionComplete,
  onCancel
}: ImageConverterProps) => {
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(targetFormat);

  // 组件加载时自动开始转换
  useEffect(() => {
    if (files.length > 0) {
      convertFiles();
    }
  }, [files]);

  // 文件转换处理函数
  const convertFiles = async () => {
    setIsConverting(true);
    
    const newResults: ConversionResult[] = [];
    
    for (const file of files) {
      const startTime = performance.now();
      
      try {
        // 创建一个临时URL来显示图像
        const url = URL.createObjectURL(file);
        
        // 创建结果对象
        const result: ConversionResult = {
          id: Math.random().toString(36).substring(2, 9),
          originalFile: file,
          convertedUrl: url,
          fileName: file.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat.toLowerCase(),
          conversionTime: parseFloat(((performance.now() - startTime) / 1000).toFixed(3))
        };
        
        newResults.push(result);
      } catch (error) {
        console.error("Error converting file:", file.name, error);
      }
    }
    
    // 直接替换结果，而不是添加到现有结果
    setResults(newResults);
    setIsConverting(false);
    
    if (onConversionComplete) {
      onConversionComplete();
    }
  };

  // 清除所有结果
  const handleClearAll = () => {
    // 清除所有对象URL以防内存泄漏
    results.forEach(result => URL.revokeObjectURL(result.convertedUrl));
    setResults([]);
    onCancel(); // 触发取消回调，返回到上传界面
  };

  // 下载所有图片的ZIP
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    
    // 为每个结果创建一个 fetch Promise
    const promises = results.map(async (result) => {
      try {
        const response = await fetch(result.convertedUrl);
        const blob = await response.blob();
        zip.file(result.fileName, blob);
      } catch (error) {
        console.error("Error adding file to zip:", result.fileName, error);
      }
    });
    
    // 等待所有 Promise 完成
    await Promise.all(promises);
    
    // 生成 ZIP 文件
    const content = await zip.generateAsync({ type: "blob" });
    
    // 触发下载
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `converted_images.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // 下载单个图片
  const handleDownloadSingle = (result: ConversionResult) => {
    const link = document.createElement('a');
    link.href = result.convertedUrl;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          {isConverting ? "Converting..." : "Successfully Converted"}
          {!isConverting && <span className="ml-2">🎉</span>}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleClearAll}
          >
            Clear all
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleDownloadZip}
            disabled={isConverting || results.length === 0}
          >
            DOWNLOAD ZIP
          </Button>
        </div>
      </div>
      
      {/* 转换中显示加载状态 */}
      {isConverting && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* 转换结果列表 */}
      <div className="space-y-4">
        {results.map(result => (
          <div key={result.id} className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              {/* 缩略图 */}
              <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                <img 
                  src={result.convertedUrl} 
                  alt={result.fileName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 文件信息 */}
              <div>
                <p className="font-medium text-gray-800">{result.fileName}</p>
                <p className="text-sm text-gray-500">Conversion time: {result.conversionTime}s</p>
              </div>
            </div>
            {/* 下载按钮 */}
            <Button 
              variant="outline" 
              className="flex items-center space-x-1"
              onClick={() => handleDownloadSingle(result)}
            >
              <Download className="h-4 w-4" />
              <span>{targetFormat.toUpperCase()}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageConverter;
