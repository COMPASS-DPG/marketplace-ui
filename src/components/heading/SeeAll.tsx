import { outfit } from '@/components/FontFamily';

const SeeAll = ({ heading }: { heading: string }) => {
  return (
    <p className={`text-[#65758C]  ${outfit.className} text-base font-normal`}>
      {heading}
    </p>
  );
};
export default SeeAll;
