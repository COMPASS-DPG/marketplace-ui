'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { completeCourseType } from '@/app/completed-course/page';

import CourseImage from '~/images/courseImage.png';

const SingleCompletedCourse = ({
  courseDetail,
}: {
  courseDetail: completeCourseType;
}) => {
  const [start, setStar] = useState(courseDetail?.start);

  const handleClick = (index: number) => {
    setStar(index);
  };
  return (
    <div className='flex gap-3 rounded-2xl p-3 shadow-lg'>
      <Image src={CourseImage} alt='course image' width='86' />
      <div className='flex flex-col'>
        <div>
          <p className='text-[16px] font-semibold leading-7 text-[#092724]'>
            {courseDetail?.name}
          </p>
          <p className='text-[12px] leading-4 text-[#697B7A]'>
            {courseDetail?.author}
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
