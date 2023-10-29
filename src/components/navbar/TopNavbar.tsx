import Link from 'next/link';
import React from 'react';

import { oxanium } from '../FontFamily';

import { NotificationBell, Wallet } from '~/svg';

const TopNavbar = () => {
  return (
    <div
      className={`flex w-full items-center justify-between border-b-2
      border-solid border-gray-100 p-5 text-2xl font-semibold text-[#65758C] ${oxanium.className}`}
    >
      <div>COMPASS</div>
      <div className='flex items-center justify-center gap-2'>
        <Link href='/purchase-history'>
          <div className='border-neutural-100 cursor-pointer rounded-lg border p-2'>
            <Wallet width='24px' />
          </div>
        </Link>
        <Link href='/notifications'>
          <div className='border-neutural-100 cursor-pointer rounded-lg border'>
            <NotificationBell width='42px' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
