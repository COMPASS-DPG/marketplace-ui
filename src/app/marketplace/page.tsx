'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import 'swiper/css';

import CourseBox from '@/components/Course/CourseBox';
import { outfit } from '@/components/FontFamily';
import Heading from '@/components/heading/Heading';
import SeeAll from '@/components/heading/SeeAll';
import UnclickableSearchInput from '@/components/Input/UnclickableSearchInput';
import SwiperDiv from '@/components/SwiperDiv';

import { RootState } from '@/redux/store';

const MarketPlace = () => {
  const { savedCourses, mostPopularCourses, recommendedCourses } = useSelector(
    (state: RootState) => state?.marketplace
  );
  const { userDetails } = useSelector((state: RootState) => state?.userDetails);

  return (
    <div className='pb-4'>
      <div className='px-5 pt-4 '>
        <Heading heading={`Hi ${userDetails?.name} 👋`} />
        <p
          className={`mb-1 text-base font-normal text-[#272728]	 ${outfit.className}`}
        >
          Let’s Improve Your{' '}
          <span className='font-semibold text-[#385B8B]'>Competency!</span>
        </p>
        {/* serach bar */}
        <div className='rounded-3xl pb-7 pt-4 '>
          <Link href='/search'>
            <UnclickableSearchInput placeholder='Search your course...' />
          </Link>
        </div>
        <div className='flex items-center justify-between'>
          <Heading heading='Continue Your Course' />
          <SeeAll heading='See all' redirectTo='/ongoing-courses' />
        </div>
        <div className='mt-4'>
          <SwiperDiv />
        </div>
      </div>
      {/* Recommended course */}
      <CourseBox
        heading='Recommended Courses'
        CoursesList={recommendedCourses}
        handleSeeAllButtonClick='/all-courses?type=recommendedCourses'
      />
      {/* most popular course */}
      <CourseBox
        heading='Most Popular Courses'
        CoursesList={mostPopularCourses}
        handleSeeAllButtonClick='/all-courses?type=popular'
      />
      {/* saved course */}
      <CourseBox
        heading='Saved Courses'
        CoursesList={savedCourses}
        handleSeeAllButtonClick='/all-courses?type=saved'
      />
    </div>
  );
};
export default MarketPlace;
