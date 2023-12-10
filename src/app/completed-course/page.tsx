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

export type completeCourseType = {
  courseId: number;
  name: string;
  author: string;
  rated: boolean;
  imageUrl: string;
  start: number;
};

// const CompleteCourselist = [
//   {
//     courseId: 1,
//     name: 'node js top course',
//     author: 'you can do it',
//     rated: true,
//     imageUrl: 'https://www.unite.ai/wp-content/uploads/2023/05/emily-bernal-v9vII5gV8Lw-unsplash.jpg',
//     start: 0,
//   },
//   {
//     courseId: 2,
//     name: 'react fundamentals',
//     author: 'coding master',
//     rated: false,
//     imageUrl: 'https://www.unite.ai/wp-content/uploads/2023/05/emily-bernal-v9vII5gV8Lw-unsplash.jpg',
//     start: 4,
//   },
//   {
//     courseId: 3,
//     name: 'full-stack web development',
//     author: 'web wizard',
//     rated: true,
//     imageUrl: 'https://www.unite.ai/wp-content/uploads/2023/05/emily-bernal-v9vII5gV8Lw-unsplash.jpg',
//     start: 5,
//   },
//   {
//     courseId: 4,
//     name: 'JavaScript advanced techniques',
//     author: 'code guru',
//     rated: false,
//     imageUrl: 'https://www.unite.ai/wp-content/uploads/2023/05/emily-bernal-v9vII5gV8Lw-unsplash.jpg',
//     start: 2,
//   },
// ];

const CompletedCourse = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = localStorage.getItem('userId') || '';
  const { courses } = useSelector((state: RootState) => state?.completedCourse);

  const courseList = (courses ?? []).filter(
    (item: CompletedCourseType) => item?.status == 'COMPLETED'
  );

  useEffect(() => {
    dispatch(getCompletedCourse(userId));
  }, [dispatch, userId]);
  return (
    <div
      className={`px-[20px] ${outfit.className} flex flex-col gap-2 bg-[#fff]`}
    >
      {courseList?.map((course: CompletedCourseType, index: number) => (
        <SingleCompletedCourse key={index} courseDetail={course} />
      ))}
    </div>
  );
};
export default CompletedCourse;
