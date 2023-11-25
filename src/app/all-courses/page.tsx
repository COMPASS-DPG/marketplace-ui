'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CourseCard from '@/components/Course/CourseCard';
import TitleNavbar from '@/components/navbar/TitleNavbar';

import {
  CourseType,
  useMarketPlaceContext,
} from '@/app/context/MarketPlaceUserContext';

const Courses = () => {
  const { savedCourses, mostPopularCourses, recommendedCourses } =
    useMarketPlaceContext();
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
      <TitleNavbar title={currentTitle} redirectTo='/marketplace' />
      <div className='flex w-full flex-col items-center gap-5'>
        {currentCourses.map((course) => {
          return <CourseCard key={course?.courseId} courseDetails={course} />;
        })}
      </div>
    </div>
  );
};
export default Courses;
