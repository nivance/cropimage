"use client";

import { ReactNode } from 'react';
import { MousePointer, Zap, Gift } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface AboutSectionProps {
  title?: string;
  description?: string;
  features?: Feature[];
  showLinks?: boolean;
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: <MousePointer className="h-8 w-8 text-blue-500" />,
    title: "Easy to Use",
    description: "Simple interface that anyone can use without any technical knowledge"
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Lightning Fast",
    description: "Process your images instantly with our optimized cropping engine"
  },
  {
    icon: <Gift className="h-8 w-8 text-blue-500" />,
    title: "Always Free",
    description: "No hidden fees, no subscriptions - just free, high-quality image cropping"
  }
];

const AboutSection = ({
  title = "About Our Online Image Cropper",
  description = "Our online image cropper is designed to be simple yet powerful, providing you with all the tools you need to perfectly crop your images.",
  features = defaultFeatures,
  showLinks = true,
  className = ""
}: AboutSectionProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{title}</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        {showLinks && (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/crop-image-circle"
              className="px-6 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Crop circle shape image
            </Link>
            <Link
              href="/crop-image-heart"
              className="px-6 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Crop image heart shape
            </Link>
            <Link
              href="/crop-image-creative"
              className="px-6 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Crop image creative shape
            </Link>
            <Link
              href="/crop-image-geometricForm"
              className="px-6 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Crop image geometric
            </Link>
            <Link
              href="/crop-image-square"
              className="px-6 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Crop image square
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
