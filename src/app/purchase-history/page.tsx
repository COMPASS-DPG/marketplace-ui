'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';

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
  date: string;
};
type ConsumerCourse = {
  id: number;
  CourseInfo: {
    title: string;
    credits: number;
    author?: string;
    date?: string;
  };
};

const PurchaseHistory = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transections, setTransections] = useState<TransectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = '123e4567-e89b-42d3-a456-556642440000';
  const userId2 = '123e4567-e89b-42d3-a456-556642440001';

  const fetchDetails = async () => {
    setLoading(true);
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
            author: item?.CourseInfo?.author || 'Dummy Auth',
            date: item?.CourseInfo?.date || '24-Aug-2023',
          };
        }
      );
      setTransections(transectionObjArray);
    } catch (error) {
      toast.error('something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className={`${outfit.className}`}>
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
      <div className='m-5 mb-7 ml-4'>
        <Heading heading='Purchase History' />
      </div>
      {/* transection details */}
      {loading ? (
        <p className='w-[260px] text-[16px] font-medium text-[#272728]'>
          Loading...
        </p>
      ) : (
        <div className='m-5 ml-4'>
          {transections.map((transection: TransectionType) => {
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
                    {transection?.date}
                  </p>
                </div>

                <hr className='my-4' />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PurchaseHistory;
