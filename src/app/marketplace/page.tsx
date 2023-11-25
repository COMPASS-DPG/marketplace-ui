'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'swiper/css';

import CourseBox from '@/components/Course/CourseBox';
import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import SearchInput from '@/components/Input/SearchInput';
import Footer from '@/components/navbar/Footer';
import SwiperDiv from '@/components/SwiperDiv';

import { useMarketPlaceContext } from '@/app/context/MarketPlaceUserContext';

const MarketPlace = () => {
  const { savedCourses, mostPopularCourses, recommendedCourses } =
    useMarketPlaceContext();
  const router = useRouter();

  const [input, setInput] = useState<string>('');

  const handleClick = (value: string) => {
    router.push(value);
  };

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
        {/* serach bar */}
        <div
          className='rounded-3xl pb-7 pt-4 '
          onClick={() => handleClick('/search')}
        >
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
      <CourseBox
        heading='Recommended Courses'
        CoursesList={recommendedCourses}
      />
      {/* most popular course */}
      <CourseBox
        heading='Most Popular Courses'
        CoursesList={mostPopularCourses}
      />
      {/* saved course */}
      <CourseBox heading='Saved Courses' CoursesList={savedCourses} />

      {/* footer */}
      <Footer />
    </div>
  );
};
export default MarketPlace;
