"use client";

import { ReactNode } from 'react';
import { Ban, Image, Shield } from 'lucide-react';

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  title?: string;
  benefits?: Benefit[];
  className?: string;
}

const defaultBenefits: Benefit[] = [
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

const WhyChooseUs = ({
  title = "Why Choose Our Image Cropper",
  benefits = defaultBenefits,
  className = ""
}: WhyChooseUsProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              {benefit.icon}
              <h3 className="text-lg font-medium text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
