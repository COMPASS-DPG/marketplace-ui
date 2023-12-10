'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import {
  CompletedCourseType,
  giveFeedbackRating,
} from '@/redux/completedCourse/action';
import { AppDispatch } from '@/redux/store';

const SingleCompletedCourse = ({
  courseDetail,
}: {
  courseDetail: CompletedCourseType;
}) => {
  const [start, setStar] = useState(parseInt(courseDetail?.rating));
  const dispatch: AppDispatch = useDispatch();
  const handleClick = (index: number) => {
    const payload = {
      courseInfoId: courseDetail.courseInfoId,
      rating: index,
    };
    dispatch(giveFeedbackRating(courseDetail.consumerId, payload));
    setStar(index);
  };
  return (
    <div className='flex gap-3 rounded-2xl p-3 shadow-lg'>
      <Image
        src={courseDetail?.CourseInfo.imageLink}
        alt='course image'
        className='rounded-xl'
        width={100}
        height={100}
      />
      <div className='flex flex-col'>
        <div>
          <p className='text-[16px] font-semibold leading-7 text-[#092724]'>
            {courseDetail?.CourseInfo?.title}
          </p>
          <p className='text-[12px] leading-4 text-[#697B7A]'>
            {courseDetail?.CourseInfo?.author}
          </p>
        </div>
        <div className='flex flex-grow items-center gap-3'>
          {Array.from({ length: start }).map((_, index) => (
            <FaStar
              key={index}
              size='20'
              color='#FFD029'
              onClick={() => handleClick(index + 1)}
            />
          ))}
          {Array.from({ length: 5 - start }).map((_, index) => (
            <FaRegStar
              key={index}
              fill='#989898'
              size='20'
              onClick={() => handleClick(start + index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SingleCompletedCourse;
