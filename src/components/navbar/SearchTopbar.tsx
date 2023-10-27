import React from 'react';
import { RxCross1 } from 'react-icons/rx';

import Heading from '@/components/heading/Heading';

const SearchTopbar = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center p-[30px]'>
      <button
        className='mr-[15px] flex h-11 w-11 cursor-pointer 
        items-center justify-center rounded-md border-2 
        border-solid border-[#D9D9D9] bg-[#FFFFFF] hover:bg-gray-100 '
      >
        <RxCross1 size={24} />
      </button>
      <Heading heading={`${title}`} />
    </div>
  );
};

export default SearchTopbar;
