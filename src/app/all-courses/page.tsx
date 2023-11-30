'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CourseCard from '@/components/Course/CourseCard';
import TitleNavbar from '@/components/navbar/TitleNavbar';

import Spinner from '@/app/components/Spinner';
import {
  CourseType,
  useMarketPlaceContext,
} from '@/app/context/MarketPlaceUserContext';

const Courses = () => {
  const {
    savedCourses,
    mostPopularCourses,
    recommendedCourses,
    loading,
    error,
  } = useMarketPlaceContext();
  const useParam = useSearchParams();

  const [currentCourses, setCurrentCourses] = useState<CourseType[]>([]);
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    const type = useParam.get('type');
    if (type === 'popular') {
      setCurrentCourses(mostPopularCourses);
      setCurrentTitle('Most Popular Courses');
    } else if (type === 'saved') {
      setCurrentCourses(savedCourses);
      setCurrentTitle('Saved Courses');
    } else {
      setCurrentCourses(recommendedCourses);
      setCurrentTitle('Recommended Courses');
    }
  }, [recommendedCourses, mostPopularCourses, savedCourses, useParam]);
  return (
    <div>
      {loading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {error && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}

      {!loading && !error && (
        <div>
          <TitleNavbar title={currentTitle} />
          <div className='flex flex-col gap-5 pl-5'>
            {currentCourses.map((course) => {
              return (
                <CourseCard
                  key={course?.courseId}
                  courseDetails={course}
                  width='331px'
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Courses;
