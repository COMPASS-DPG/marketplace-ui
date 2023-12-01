'use client';
import Image from 'next/image';
import Link from 'next/link';

import { outfit } from '@/components/FontFamily';

import { CourseType } from '@/redux/marketplace/marketplaceReducer';

import ColoredText from '../heading/ColoredText';
import CourseImage from '../../../public/images/courseImage.png';

import { EditIcon, Star } from '~/svg';

const CourseCard = ({
  courseDetails,
  width = '311px',
}: {
  courseDetails: CourseType;
  width?: string;
}) => {
  return (
    <Link href={`/course-description/${courseDetails?.courseId}`}>
      <div
        className={`h-[156px] w-[${width}] rounded-2xl border bg-white shadow ${outfit.className}`}
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
              {Object.keys(courseDetails?.competency)?.map((key, index) => {
                if (index < 2) {
                  return (
                    <li className='font-semibold' key={key}>
                      {key} (
                      {courseDetails?.competency[key]
                        .map(
                          (level: string, levelIndex: number) =>
                            `L${levelIndex + 1}`
                        )
                        .join(', ')}
                      ){index == 1 && '....'}
                    </li>
                  );
                }
                return null; // Skip rendering for keys beyond the first two and the ellipsis
              })}
            </div>
          </div>
          {/* Icon and language list */}
        </div>
        <div className='flex px-2'>
          <div className='flex items-center gap-1'>
            <EditIcon width='20px' />
            <span
              className={`${outfit.className} py-1 text-[13px] font-medium uppercase text-[#385B8B]  `}
            >
              {courseDetails?.providerName}
            </span>
            {courseDetails?.language?.map((item: string, index: number) => (
              <ColoredText
                key={index}
                text={item.charAt(0).toUpperCase() + item.slice(1)}
                classes={`${
                  index % 2 == 0
                    ? 'bg-[#DAFFDA] text-[#4ACB5F]'
                    : 'bg-[#C7DEFF] text-[#385B8B]'
                }`}
              />
            ))}
          </div>
        </div>
        <div className='flex justify-between px-2'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            Cr. {courseDetails?.credits}
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
