"use client";

import { ReactNode } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
}

interface StepsSectionProps {
  title?: string;
  steps: Step[];
  className?: string;
}

const StepsSection = ({
  title = "How to Crop Images Online - Simple Steps",
  steps,
  className = ""
}: StepsSectionProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex">
              <div className="mr-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
