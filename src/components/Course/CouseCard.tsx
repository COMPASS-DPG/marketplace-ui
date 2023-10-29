'use client';
import Image from 'next/image';
import Link from 'next/link';

import { outfit } from '@/components/FontFamily';

import ColoredText from '../heading/ColoredText';
import CourseImage from '../../../public/images/courseImage.png';

import { EditIcon, Star } from '~/svg';

const CouseCard = () => {
  return (
    <Link href='/course-description'>
      <div
        className={`h-[156px] w-[311px] rounded-2xl border bg-white shadow ${outfit.className}`}
      >
        <div className='flex p-2'>
          <Image src={CourseImage} alt='courseImage' />
          <div className='pl-2'>
            <p
              className={`w-[211px] ${outfit.className} text-[15px] font-bold text-zinc-800`}
            >
              Communication ipsum dolpoid skills
            </p>
            <p
              className={`w-[211px] ${outfit.className} text-[13px] font-normal text-neutral-500`}
            >
              Pregnancy Identification (L1,L2) , Birth Planning and
              preparednes.....
            </p>
          </div>
          {/* Icon and language list */}
        </div>
        <div className='flex px-2'>
          <div className='flex items-center'>
            <EditIcon width='20px' />
            <span
              className={`${outfit.className} py-1 text-[13px] font-medium text-[#385B8B]  `}
            >
              UPTSU
            </span>
            <ColoredText
              textColor='#4ACB5F'
              backGroundColor='#DAFFDA'
              text='English'
            />

            <ColoredText
              textColor='#385B8B'
              backGroundColor='#C7DEFF'
              text='Hindi'
            />
          </div>
        </div>
        <div className='flex justify-between px-2'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            Cr.100
          </p>
          <p className='flex items-center text-[12px] font-bold text-[#787878]'>
            4.5
            <span className='pl-0.5'>
              <Star width='12px' />
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CouseCard;
