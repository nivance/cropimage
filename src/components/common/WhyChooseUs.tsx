"use client";

import { ReactNode } from 'react';
import { Crop, Zap, Ban, Cable, HardHat, ShieldPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Benefit {
  icon: ReactNode;
  title: string;
}

interface WhyChooseUsProps {
  title?: string;
  benefits?: Benefit[];
  className?: string;
}

const defaultBenefits: Benefit[] = [
  {
    icon: <Crop className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "free_crop"
  },
  {
    icon: <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "fast_process"
  },
  {
    icon: <HardHat className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "secure"
  },
  {
    icon: <Ban className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "no_watermark"
  },
  {
    icon: <Cable className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "supported_formats"
  },
  {
    icon: <ShieldPlus className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
    title: "privacy_protected"
  }
];

const WhyChooseUs = ({
  title = "Why Choose Our Image Cropper",
  benefits = defaultBenefits,
  className = ""
}: WhyChooseUsProps) => {

  const whyus = useTranslations('whyus');
  const home = useTranslations('home');

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-10">{home('whyus')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              {benefit.icon}
              <h3 className="text-lg font-medium text-gray-800 mb-3">{whyus(`${benefit.title}.title`)}</h3>
              <p className="text-sm text-gray-600">{whyus(`${benefit.title}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
