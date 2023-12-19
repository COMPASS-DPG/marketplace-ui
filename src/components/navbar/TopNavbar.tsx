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
      <div className='flex items-center justify-center gap-2 '>
        <Link href='/purchase-history'>
          <div className='cursor-pointer rounded-lg border border-neutral-100 p-2 hover:bg-slate-200'>
            <Wallet width='24px' />
          </div>
        </Link>
        <Link href='/notifications'>
          <div className='cursor-pointer rounded-lg border border-neutral-100 hover:bg-slate-200'>
            <NotificationBell width='42px' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
