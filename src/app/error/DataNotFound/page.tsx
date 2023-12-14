'use client';
import React from 'react';

import TextButton from '@/components/buttons/TextButton';
import { outfit } from '@/components/FontFamily';

import NotFoundIcon from '~/svg/NotFoundIcon.svg';

const Page = () => {
  const handleRefresh = () => {
    window.location.href = '/';
  };
  return (
    <div className='p-4 text-center'>
      <p className={`text-2xl font-semibold ${outfit.className} `}>Oops!</p>
      <div className='my-5 flex items-center justify-center '>
        <NotFoundIcon className='w-[150px]' />
      </div>
      <p
        className={`text-base font-normal text-[#65758C] ${outfit.className} `}
      >
        Not able to fetch data
        <br />
        Some connection Error Happened!
      </p>
      <TextButton variant='basic' onClick={handleRefresh} className='mt-4'>
        Try again
      </TextButton>
      <></>
    </div>
  );
};

export default Page;
