import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl';

export default function FAQs({faqInfo, faqs, faqKeys} : {faqInfo: string, faqs: string, faqKeys: string[]}) {
  const t = useTranslations(faqInfo);
  const faqItem = useTranslations(faqs)
  return (
    <div className="relative py-12">
      <div className="mx-auto max-w-[70%] px-6 lg:px-8 relative grid gap-12 mb-2">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter text-center">{t('title')}</h2>
          <p className="text-base tracking-tight text-gray-500">{t('desc')}</p>
          <Accordion type="single" collapsible className="w-full text-left">
            {faqKeys.map((key) => (
                <Accordion key={key} type="single" collapsible className="w-full text-left">
                  <AccordionItem value="item-1" className="border-neutral-300">
                    <AccordionTrigger value="" className="text-left">{faqItem(`${key}.q`)}</AccordionTrigger>
                    <AccordionContent value="" className="text-gray-600 dark:text-gray-400">{faqItem(`${key}.a`)}</AccordionContent>
                  </AccordionItem>
                </Accordion>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}