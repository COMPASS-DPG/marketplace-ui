import ButtonFill from '@/components/buttons/ButtonFill';
import { outfit, poppins } from '@/components/FontFamily';

const SwipeSlide = () => {
  return (
    <div
      className={`h-[140px] w-[331px] rounded-lg border border-gray-400 border-opacity-20 bg-white px-3 py-2  ${outfit.className}`}
    >
      <p className='text-[12px] font-bold tracking-[0.12px] text-[#787878]'>
        Ongoing . 04/07{' '}
      </p>
      <p
        className={`text-[15px] font-bold ${poppins.className} my-0.5 tracking-[0.15px] text-[#272728]`}
      >
        Communication skill Lorem ipsum
      </p>
      <p
        className={`${outfit.className} text-[13px] font-normal text-neutral-500`}
      >
        Pregnancy Identification (L1,L2),
        <br /> Birth Planning and preparedness for PW (L1,L2,L3)
      </p>
      <div className='mt-2 flex justify-between'>
        <p className='text-[#092724]` my-1 text-[14px] font-normal '>
          Created by
          <span className=' text-[#385B8B]` my-1 pl-1 text-[14px] font-bold '>
            UPTSU
          </span>
        </p>
        <ButtonFill
          onClick={() => {
            return null;
          }}
          classes='w-[100px] h-[30px] bg-[#385B8B]'
        >
          Continue
        </ButtonFill>
      </div>
    </div>
  );
};
export default SwipeSlide;
