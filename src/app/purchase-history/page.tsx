'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';

import Spinner from '@/app/components/Spinner';
import {
  fetchCredits,
  fetchPurchaseHistory,
} from '@/services/marketplaceServices';

import { LeftArrow, Wallet } from '~/svg';

type TransectionType = {
  id: number;
  credits: number;
  title: string;
  author: string;
  purchasedAt: string;
};
type ConsumerCourse = {
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
  const userId2 = '123e4567-e89b-42d3-a456-556642440001';
  const [balance, setBalance] = useState<number>(0);
  const [transections, setTransections] = useState<TransectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchDetails = useCallback(async () => {
    try {
      const [creditsResponse, purchaseHistoryResponse] = await Promise.all([
        fetchCredits(userId),
        fetchPurchaseHistory(userId2),
      ]);
      setBalance(creditsResponse);
      const transectionObjArray = purchaseHistoryResponse.map(
        (item: ConsumerCourse) => {
          return {
            id: item?.id,
            title: item?.CourseInfo?.title,
            credits: item?.CourseInfo?.credits,
            author: item?.CourseInfo?.providerName,
            purchasedAt: item?.purchasedAt,
          };
        }
      );
      setLoading(false);
      setTransections(transectionObjArray);
    } catch (error) {
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
      setLoading(false);
      setError(true);
    }
  }, [userId]); // Removed the extra comma

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className={`${outfit.className}`}>
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {error && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}
      {!loading && !error && (
        <div>
          {/*  top balance section */}
          <div className='flex flex-col items-center  pt-4'>
            <div className='flex h-[70px] w-[360px] items-center justify-between rounded-xl bg-[#E8FFEB] p-2.5'>
              <div>
                <div className='flex items-center gap-3'>
                  <Link href='/marketplace'>
                    <LeftArrow width='24px' />
                  </Link>

                  <p className='text-base font-normal text-[#65758C]'>
                    Wallet Balance
                  </p>
                </div>

                <p className='pl-10 pt-1 text-[24px] font-semibold text-[#385B8B]'>
                  {balance}
                </p>
              </div>
              <div>
                <Wallet width='35px' />
              </div>
            </div>
          </div>
          {/* heading */}
          <div className='m-5 mb-7 ml-4 mt-5'>
            <Heading heading='Purchase History' />
          </div>
          {/* transection details */}

          <div className='m-5 ml-4'>
            {transections.map((transection: TransectionType) => {
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
