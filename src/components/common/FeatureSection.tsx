"use client";

import { ReactNode } from 'react';
import { Crop, Zap, Shield, Ban, Image } from 'lucide-react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  features?: Feature[];
  customFeatures?: ReactNode;
}

const defaultFeatures: Feature[] = [
  {
    icon: <Crop className="h-8 w-8 text-blue-500" />,
    title: "Free Crop",
    description: "Crop your images to any size you want"
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Fast Process",
    description: "Quick and efficient online processing"
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Secure",
    description: "Local processing, privacy protected"
  },
  {
    icon: <Ban className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "No Watermark",
    description: "Our free image cropper doesn't add any watermarks to your images. Get clean, professional results every time."
  },
  {
    icon: <Image className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "All Formats Supported",
    description: "Support for all major image formats including JPG, PNG, and BMP. No conversion needed."
  },
  {
    icon: <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "Privacy Protected",
    description: "All processing is done in your browser. Your images are never uploaded to our servers."
  }
];

const FeatureSection = ({ features = defaultFeatures, customFeatures }: FeatureSectionProps) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {customFeatures ? (
          customFeatures
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
