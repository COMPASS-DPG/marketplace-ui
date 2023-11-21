import React from 'react';
import { RxCross1 } from 'react-icons/rx';

import Heading from '@/components/heading/Heading';

const SearchTopbar = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center p-[16px]'>
      <button
        className='mr-[15px] flex h-11 w-11 cursor-pointer 
        items-center justify-center rounded-md border
        border-solid border-[#F4F4F4] bg-[#FFFFFF] hover:bg-gray-100 '
      >
        <RxCross1 size={24} />
      </button>
      <Heading heading={`${title}`} />
    </div>
  );
};

export default SearchTopbar;
