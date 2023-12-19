'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SingleCompletedCourse from '@/components/Course/SingleCompletedCourse';
import { outfit } from '@/components/FontFamily';

import {
  CompletedCourseType,
  getCompletedCourse,
} from '@/redux/completedCourse/action';
import { AppDispatch, RootState } from '@/redux/store';

const CompletedCourse = () => {
  const dispatch: AppDispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state?.completedCourse);

  const courseList = (courses ?? []).filter(
    (item: CompletedCourseType) => item?.status == 'COMPLETED'
  );

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    dispatch(getCompletedCourse(userId));
  }, [dispatch]);
  return (
    <div className={`px-5 pb-5 ${outfit.className} flex flex-col gap-2`}>
      {courseList?.map((course: CompletedCourseType, index: number) => (
        <SingleCompletedCourse key={index} courseDetail={course} />
      ))}
    </div>
  );
};
export default CompletedCourse;
