import ImageConverterPage from '@/components/converter';
import WhyChooseUsConverter from '@/components/common/WhyChooseUsConverter';

export default function Page() {

  return (
    <div className="py-6">
      <ImageConverterPage source="WEBP" target="JPG" />
      <WhyChooseUsConverter />
    </div>
  );
}
