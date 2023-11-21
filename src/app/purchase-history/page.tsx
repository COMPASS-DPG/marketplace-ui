'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';

import { LeftArrow, Wallet } from '~/svg';

const getEmptyValue = () => {
  return [
    {
      id: 1,
      amount: -50,
      course_name: 'Software Engineering',
      author: 'Author 18',
      date: '2023-11-17',
    },
    {
      id: 2,
      amount: -60,
      course_name: 'Project Management',
      author: 'Author 20',
      date: '2023-11-19',
    },
    {
      id: 3,
      amount: -25,
      course_name: 'Digital Illustration',
      author: 'Author 22',
      date: '2023-11-21',
    },
  ];
};
type TransectionType = {
  id: number;
  amount: number;
  course_name: string;
  author: string;
  date: string;
};

const PurchaseHistory = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transections, setTransections] = useState<TransectionType[]>(
    getEmptyValue()
  );

  const fetchTransections = () => {
    axios.get('http://localhost:3000/wallet').then((response) => {
      const data = response.data;
      setBalance(data.main_wallet_balance);
      setTransections(data.transactions);
    });
  };

  useEffect(() => {
    fetchTransections();
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
      <div className='m-5 ml-4'>
        {transections.map((transection: TransectionType) => {
          const { amount, id, course_name, author, date } = transection;

          return (
            <div key={id}>
              <div className='flex  items-center justify-between'>
                <p className='w-[260px] text-[16px] font-medium text-[#272728]'>
                  {course_name}
                </p>
                <p className='text-base font-semibold text-[#ED672B]'>
                  {amount}
                </p>
              </div>
              <div className='flex justify-between'>
                <p className='pt-2 text-xs uppercase text-[#697B7A]'>
                  {author}
                </p>
                <p className='pt-2 text-xs text-[#697B7A]'>{date}</p>
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
