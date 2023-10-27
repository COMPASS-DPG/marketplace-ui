'use client';
import { useState } from 'react';

import CouseCard from '@/components/Course/CouseCard';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import SearchInput from '@/components/Input/SearchInput';

import { NotFound } from '~/svg';

const SearchPage = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className='ml-[30px]'>
      <div>
        <SearchInput
          value={input}
          onChange={setInput}
          placeholder='Search your course...'
        />
      </div>
      {/* either */}
      <div>
        <div className='mt-5 flex items-center justify-between  py-4 pr-5'>
          <Heading heading='Recommended Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2'>
          <CouseCard />
        </div>
      </div>
      {/* Or */}
      <div>
        <div className='mt-5 flex items-center justify-between  py-4 pr-5'>
          <Heading heading='Related Results' />
        </div>
        <div className='flex  gap-2'>
          <CouseCard />
        </div>
      </div>
      {/* nothing is present */}
      <div className='py-10'>
        <div className='flex justify-center'>
          <NotFound width='200px' height='162px' />
        </div>
        <div className='mx-5 text-center'>
          <p className='#272728 text-xl font-semibold text-[#272728]'>
            Search not found
          </p>
          <p className='#65758C text-sm font-normal text-[#272728]'>
            Please activate the property name search service that is available
            correctly
          </p>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
