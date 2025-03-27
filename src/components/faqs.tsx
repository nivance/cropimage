import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

export default function FAQs() {
  const t = useTranslations('faqInfo');
  const faqs = useTranslations('faqs')
  const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'] as const;
  return (
    <div className="relative py-12">
      <div className="mx-auto max-w-[70%] px-6 lg:px-8 relative grid gap-12 mb-2">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-3xl font-bold tracking-tighter text-center">{t('title')}</h2>
          <p className="text-base tracking-tight text-gray-500">{t('desc')}</p>
          <Accordion type="single" collapsible className="w-full text-left">
            {keys.map((key) => (
                <Accordion key={key} type="single" collapsible className="w-full text-left">
                  <AccordionItem value="item-1" className="border-neutral-300">
                    <AccordionTrigger value="" className="text-left">{faqs(`${key}.q`)}</AccordionTrigger>
                    <AccordionContent value="" className="text-gray-600 dark:text-gray-400">{faqs(`${key}.a`)}</AccordionContent>
                  </AccordionItem>
                </Accordion>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}