import Link from 'next/link';

import { outfit } from '@/components/FontFamily';

const SeeAll = ({
  heading,
  redirectTo,
}: {
  heading: string;
  redirectTo: string;
}) => {
  return (
    <Link href={redirectTo}>
      <p
        className={`text-[#65758C]  ${outfit.className} text-base font-normal`}
      >
        {heading}
      </p>
    </Link>
  );
};
export default SeeAll;
