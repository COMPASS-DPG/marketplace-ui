'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '@/components/Course/CourseCard';
import TitleNavbar from '@/components/navbar/TitleNavbar';

import Spinner from '@/app/components/Spinner';
import { getMarketplaceCourses } from '@/redux/marketplace/action';
import { CourseType } from '@/redux/marketplace/marketplaceReducer';
import { AppDispatch, RootState } from '@/redux/store';

const Courses = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const dispatch: AppDispatch = useDispatch();
  const {
    isLoading,
    isError,
    savedCourses,
    mostPopularCourses,
    recommendedCourses,
  } = useSelector((state: RootState) => state?.marketplace);
  const useParam = useSearchParams();

  const [currentCourses, setCurrentCourses] = useState<CourseType[]>([]);
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    const type = useParam.get('type');
    if (!savedCourses || !mostPopularCourses || !recommendedCourses) {
      dispatch(getMarketplaceCourses(userId));
    }
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
  }, [
    dispatch,
    recommendedCourses,
    mostPopularCourses,
    savedCourses,
    useParam,
    userId,
  ]);

  return (
    <div>
      {isLoading && (
        <div className='mt-[100px] text-center'>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className='mt-[100px] text-center text-[16px] font-medium text-[#272728]'>
          Error...
        </div>
      )}

      {!isLoading && !isError && (
        <div>
          <TitleNavbar title={currentTitle} />
          <div className='flex flex-col gap-5 px-3.5'>
            {currentCourses?.map((course) => {
              return (
                <CourseCard key={course?.courseId} courseDetails={course} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Courses;
