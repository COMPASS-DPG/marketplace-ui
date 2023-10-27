import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';

import { LeftArrow, Wallet } from '~/svg';

const PurchaseHistory = () => {
  return (
    <div className={`${outfit.className}`}>
      {/*  top balance section */}
      <div className='flex flex-col items-center  pt-4'>
        <div className='flex h-[70px] w-[360px] items-center justify-between rounded-xl bg-[#E8FFEB] p-2.5'>
          <div>
            <div className='flex items-center gap-3'>
              <LeftArrow width='24px' />

              <p className='text-base font-normal text-[#65758C]'>
                Wallet Balance
              </p>
            </div>

            <p className='pl-10 pt-1 text-[24px] font-semibold text-[#385B8B]'>
              243
            </p>
          </div>
          <div>
            <Wallet width='35px' />
          </div>
        </div>
      </div>
      {/* heading */}
      <div className='m-5 mb-7 ml-4'>
        <Heading heading='Purchase History' />
      </div>
      {/* transection details */}
      <div className='m-5 ml-4'>
        {[1, 2, 3, 4, 5, 6].map((item: number, index: number) => {
          return (
            <div key={index}>
              <div className='flex  items-center justify-between'>
                <p className='w-[260px] text-[16px] font-medium text-[#272728]'>
                  Understand Medical Eligibility of FP Methods
                </p>
                <p className='text-base font-semibold text-[#ED672B]'>-15</p>
              </div>
              <div className='flex justify-between'>
                <p className='pt-2 text-xs text-[#697B7A]'>UPSTU</p>
                <p className='pt-2 text-xs text-[#697B7A]'>Apr 4, 2023</p>
              </div>

              <hr className='my-4' />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PurchaseHistory;
