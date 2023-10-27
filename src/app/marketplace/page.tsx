'use client';
import { useState } from 'react';

import CouseCard from '@/components/Course/CouseCard';
import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import SearchInput from '@/components/Input/SearchInput';
import Footer from '@/components/navbar/Footer';
import SwiperDiv from '@/components/SwiperDiv';

const MarketPlace = () => {
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <div className='px-5 pb-4 pt-4 '>
        <Heading heading='Hi Akshay Anand 👋' />
        <p
          className={`mb-1 text-base font-normal text-[#272728]	 ${outfit.className}`}
        >
          Let’s Improve Your{' '}
          <span className='font-semibold text-[#385B8B]'>Competency!</span>
        </p>
        <div className='rounded-3xl pb-7 pt-4 '>
          <SearchInput
            value={input}
            onChange={setInput}
            placeholder='Search your course...'
          />
        </div>
        <div className='flex items-center justify-between'>
          <Heading heading='Continue Your Course' />
          <SeeAll heading='See all' />
        </div>
        <div className='mt-5'>
          <SwiperDiv />
        </div>
      </div>
      {/* Recommended course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Recommended Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2 px-4'>
          <CouseCard />
        </div>
      </div>
      {/* most popular course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Most Popular Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2 px-4'>
          <CouseCard />
        </div>
      </div>
      {/* saved course */}
      <div>
        <div className='mt-5 flex items-center justify-between px-5 py-4'>
          <Heading heading='Saved Courses' />
          <SeeAll heading='See all' />
        </div>
        <div className='flex  gap-2 px-4'>
          <CouseCard />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};
export default MarketPlace;
