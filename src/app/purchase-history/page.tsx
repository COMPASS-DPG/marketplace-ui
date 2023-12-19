'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';

import Spinner from '@/app/components/Spinner';
import { getPurchaseHistory } from '@/redux/purchaseHistory/action';
import { AppDispatch, RootState } from '@/redux/store';

import { LeftArrow, Wallet } from '~/svg';

export type TransectionType = {
  id: number;
  credits: number;
  title: string;
  author: string;
  purchasedAt: string;
};

export type ConsumerCourse = {
  id: number;
  purchasedAt?: string;
  CourseInfo: {
    title: string;
    credits: number;
    providerName?: string;
  };
};

const PurchaseHistory = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const { walletBalance, purchaseHistory, isLoading, isError } = useSelector(
    (state: RootState) => state.purchaseHistory
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchaseHistory(userId));
  }, [dispatch, userId]);

  return (
    <div className={`${outfit.className}`}>
      {isLoading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}
      {!isLoading && !isError && (
        <div>
          {/*  top balance section */}
          <div className='m-4 flex items-center justify-between rounded-xl bg-[#E8FFEB] p-2.5'>
            <div>
              <div className='flex items-center gap-3'>
                <Link
                  href='/marketplace'
                  className='rounded-md p-1 hover:bg-[#c3f3ca]'
                >
                  <LeftArrow width='24px' />
                </Link>

                <p className='text-base font-normal text-[#65758C]'>
                  Wallet Balance
                </p>
              </div>

              <p className='pl-10 pt-1 text-[24px] font-semibold text-[#385B8B]'>
                {walletBalance}
              </p>
            </div>
            <div>
              <Wallet width='35px' />
            </div>
          </div>
          {/* heading */}
          <div className='m-5 mb-7 ml-4 mt-5'>
            <Heading heading='Purchase History' />
          </div>
          {/* transection details */}

          <div className='m-5 ml-4'>
            {purchaseHistory?.map((transection: TransectionType) => {
              const purchasedDate = new Date(transection?.purchasedAt);
              const formattedDate = purchasedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div key={transection?.id}>
                  <div className='flex  items-center justify-between'>
                    <p className='w-[260px] text-[16px] font-medium text-[#272728]'>
                      {transection?.title}
                    </p>
                    <p className='text-base font-semibold text-[#ED672B]'>
                      - {transection?.credits}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='pt-2 text-xs uppercase text-[#697B7A]'>
                      {transection?.author}
                    </p>
                    <p className='pt-2 text-xs text-[#697B7A]'>
                      {formattedDate}
                    </p>
                  </div>

                  <hr className='my-4' />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default PurchaseHistory;
