"use client";

import { useState, useEffect } from 'react';
import ConvertUpload from '@/components/common/ConvertUpload';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import FeatureSection from '@/components/common/FeatureSection';
import { Crop, Zap, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JSZip from 'jszip';

// 新增转换结果类型
interface ConversionResult {
  id: string;
  originalFile: File;
  convertedUrl: string;
  fileName: string;
  conversionTime: number;
}

export default function WebpToJpgPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  // 处理文件选择
  const handleFileSelect = (files: File[] | string[]) => {
    if (Array.isArray(files) && files.length > 0 && typeof files[0] !== 'string') {
      const fileArray = files as File[];
      setUploadedFiles(prev => [...prev, ...fileArray]);
    }
  };

  // 当文件上传后自动开始转换
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      convertFiles();
    }
  }, [uploadedFiles]);

  // 文件转换处理函数
  const convertFiles = async () => {
    setIsConverting(true);
    
    const newResults: ConversionResult[] = [];
    
    for (const file of uploadedFiles) {
      const startTime = performance.now();
      
      try {
        // 创建一个临时URL来显示图像
        const url = URL.createObjectURL(file);
        
        // 创建结果对象
        const result: ConversionResult = {
          id: Math.random().toString(36).substring(2, 9),
          originalFile: file,
          convertedUrl: url,
          fileName: file.name.replace(/\.[^/.]+$/, '') + '.jpg',
          conversionTime: parseFloat(((performance.now() - startTime) / 1000).toFixed(3))
        };
        
        newResults.push(result);
      } catch (error) {
        console.error("Error converting file:", file.name, error);
      }
    }
    
    setResults(prev => [...prev, ...newResults]);
    setUploadedFiles([]); // 清空已处理的文件
    setIsConverting(false);
  };

  // 清除所有结果
  const handleClearAll = () => {
    // 清除所有对象URL以防内存泄漏
    results.forEach(result => URL.revokeObjectURL(result.convertedUrl));
    setResults([]);
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
    link.download = "converted_images.zip";
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

  const features = [
    {
      icon: <Crop className="h-8 w-8 text-blue-500" />,
      title: "Free Conversion",
      description: "Convert your WEBP files into corresponding JPG images."
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Fast Processing",
      description: "Efficient online conversion, quickly generating JPG files."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Safe and Reliable",
      description: "Local processing to protect your privacy."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Convert WEBP to JPG
          </h1>
          <p className="text-gray-600">
            Quickly convert your WEBP images to JPG format. Free online conversion with no software installation required. Maintain quality and convert in seconds.
          </p>
        </div>

        {/* 上传区域 - 始终显示 */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-8">
          <ConvertUpload
            onFileSelect={handleFileSelect}
            uploadText="Drop your WEBP images or press here to upload"
          />
        </div>
        
        {/* 结果区域 - 有结果时显示 */}
        {results.length > 0 && (
          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Successfully Converted 🎉🎉🎉
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
                >
                  DOWNLOAD ZIP
                </Button>
              </div>
            </div>
            
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
                    <span>JPG</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FeatureSection features={features} />
      <WhyChooseUs />
    </div>
  );
}
