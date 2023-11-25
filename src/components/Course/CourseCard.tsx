'use client';
import Image from 'next/image';
import Link from 'next/link';

import { outfit } from '@/components/FontFamily';

import { CourseType } from '@/app/context/MarketPlaceUserContext';

import ColoredText from '../heading/ColoredText';
import CourseImage from '../../../public/images/courseImage.png';

import { EditIcon, Star } from '~/svg';
const CourseCard = ({ courseDetails }: { courseDetails: CourseType }) => {
  return (
    <Link href={`/course-description/${courseDetails?.courseId}`}>
      <div
        className={`h-[156px] w-[311px] rounded-2xl border bg-white shadow ${outfit.className}`}
      >
        <div className='flex p-2'>
          <Image src={CourseImage} alt='courseImage' />
          <div className='pl-2'>
            <p
              className={`w-[211px] ${outfit.className} text-[15px] font-bold text-zinc-800`}
            >
              {courseDetails?.title}
            </p>
            <div
              className={`w-[211px] ${outfit.className} text-[13px] font-normal text-neutral-500`}
            >
              {Object.keys(courseDetails?.competency || {}).map(
                (key, index) => (
                  <div key={index}>
                    <p className='font-semibold'>{key}</p>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Icon and language list */}
        </div>
        <div className='flex px-2'>
          <div className='flex items-center'>
            <EditIcon width='20px' />
            <span
              className={`${outfit.className} py-1 text-[13px] font-medium uppercase text-[#385B8B]  `}
            >
              {courseDetails?.created_by}
            </span>
            <ColoredText classes='text-[#4ACB5F] bg-[#DAFFDA]' text='English' />
            <ColoredText classes='text-[#385B8B] bg-[#C7DEFF]' text='Hindi' />
          </div>
        </div>
        <div className='flex justify-between px-2'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            {courseDetails?.credits}
          </p>
          <p className='flex items-center text-[12px] font-bold text-[#787878]'>
            {courseDetails?.avgRating || '-'}
            <span className='pl-0.5'>
              <Star width='12px' />
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CourseCard;
