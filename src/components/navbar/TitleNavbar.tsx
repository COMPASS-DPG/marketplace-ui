import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import Heading from '@/components/heading/Heading';

const TitleNavbar = ({
  title,
  redirectTo,
}: {
  title: string;
  redirectTo: string;
}) => {
  return (
    <div className='flex items-center p-[30px]'>
      <button
        className='mr-[15px] flex h-11 w-11 cursor-pointer 
        items-center justify-center rounded-md border-2
         border-[#F4F4F4] bg-[#FFFFFF] hover:bg-gray-100 '
      >
        <Link href={`${redirectTo}`}>
          <MdOutlineKeyboardArrowLeft size={28} />
        </Link>
      </button>
      <Heading heading={`${title}`} />
    </div>
  );
};

export default TitleNavbar;
