import { outfit } from '@/components/FontFamily';

const Heading = ({ heading }: { heading: string }) => {
  return (
    <p className={`text-xl  font-semibold ${outfit.className}	text-[#272728] `}>
      {heading}
    </p>
  );
};
export default Heading;
