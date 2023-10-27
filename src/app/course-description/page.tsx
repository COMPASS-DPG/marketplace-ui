'use client';
import Image from 'next/image';
import { BsFillBookmarkFill, BsShare } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import ButtonFill from '@/components/buttons/ButtonFill';
import Competencies from '@/components/Competencies';
import { outfit } from '@/components/FontFamily';
import ColoredText from '@/components/heading/ColoredText';
import Overview from '@/components/Overview';
import BasicPopup from '@/components/popUp/BasicPopup';
import ButtonPopup from '@/components/popUp/ButtonPopup';

import CourseFullImage from '../../../public/images/courseFullImage.png';

import { EditIcon, Star } from '~/svg';

const CourseDescription = () => {
  return (
    <div className={`${outfit.className}`}>
      <BasicPopup />
      <ButtonPopup />
      {/* header */}
      <div
        className={`flex w-full items-center justify-between 
       p-5 text-2xl font-semibold text-[#65758C]`}
      >
        <div className='border-neutural-100 rounded-lg border'>
          <MdOutlineKeyboardArrowLeft width='24px' className=' m-2' />
        </div>
        <div className='flex items-center justify-center gap-5'>
          <div className='border-neutural-100 rounded-lg border'>
            {/* <BsBookmark width='24px' className=' m-2' /> */}
            {/* or */}
            <BsFillBookmarkFill width='24px' className=' m-2' />
          </div>
          <div className='border-neutural-100 rounded-lg border'>
            <BsShare width='24px' className=' m-2' />
          </div>
        </div>
      </div>
      {/* description */}
      <div className='px-5 py-2'>
        <Image
          src={CourseFullImage}
          alt='course-description-image'
          width='510'
        />
        <p className='pt-3 text-[18px] font-extrabold  text-[#272728]'>
          Communication ipsum dolpoid skills
        </p>
        <div className='flex items-center gap-1'>
          <EditIcon width='22px' />
          <span
            className={`${outfit.className} py-1 text-[15px] font-medium text-[#385B8B]  `}
          >
            UPTSU
          </span>
        </div>
        <div>
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
        <div className='flex justify-between px-2'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            Cr.100
          </p>
          <p className='flex items-center text-[15px] font-bold text-[#787878]'>
            4.5
            <span className='pl-0.5'>
              <Star width='12px' />
            </span>
          </p>
        </div>
      </div>
      {/* member tab */}
      <div className='flex items-center gap-1 px-5 text-[16px] text-[#65758C]'>
        <GoPeople />
        <p>121 Members</p>
      </div>
      <hr className='mb-5 mt-4 h-[1px] text-[#F4F4F4]' />
      {/* Overview and compitency */}

      <div className='px-5'>
        <div className='flex justify-center gap-5 '>
          <div className='border-b-2  border-[#272728]'>
            <p className='px-4 py-2.5 text-center text-[17px] font-semibold leading-6 tracking-[0.102px] text-[#272728]'>
              Overview
            </p>
          </div>
          <div>
            <p className=' text-center  text-[17px] leading-6 tracking-[0.102px] text-[#272728]'>
              Competencies
            </p>
          </div>
        </div>
        {/* two component */}
        <div>
          <Overview />
          <Competencies />
        </div>
        {/* bottom button */}
        <div className='flex justify-center'>
          <ButtonFill
            onClick={() => null}
            classes='w-[330px] h-[45px] bg-[#385B8B]'
          >
            Buy Now Cr.145
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};
export default CourseDescription;
