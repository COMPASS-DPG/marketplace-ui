import { useRouter } from 'next/navigation';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import Heading from '@/components/heading/Heading';

const TitleNavbar = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className='mb-5 flex items-center p-5'>
      <button
        className='mr-[15px] flex h-11 w-11 cursor-pointer 
        items-center justify-center rounded-md border-2
         border-[#F4F4F4] bg-[#FFFFFF] hover:bg-gray-100 '
      >
        <MdOutlineKeyboardArrowLeft size={28} onClick={() => router.back()} />
      </button>
      <Heading heading={`${title}`} />
    </div>
  );
};

export default TitleNavbar;
