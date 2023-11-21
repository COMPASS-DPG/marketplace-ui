'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

import { CourseType, getInitialValue } from '../../marketplace/page';
import CourseFullImage from '../../../../public/images/courseFullImage.png';

import { EditIcon, Star } from '~/svg';

const CourseDescription = () => {
  const router = useRouter();

  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [DetailsPopUp, setDetailsPopUp] = useState<boolean>(false);
  const [option, setOption] = useState('overview');
  const [courseDetails, setCourseDetails] = useState<CourseType>(
    getInitialValue()[0]
  );

  const fetchSingleCourse = () => {
    // we fetch here data based on single user key and then set it
    setCourseDetails(getInitialValue()[0]);
  };
  useEffect(() => {
    fetchSingleCourse();
  });

  const goBack = () => {
    router.back();
  };

  return (
    <div className={`${outfit.className}`}>
      {/* buy course popup */}
      {showPopUp && <ButtonPopup setShowPopUp={setShowPopUp} />}
      {/* authore Details popup */}
      {DetailsPopUp && (
        <BasicPopup
          setDetailsPopUp={setDetailsPopUp}
          courseDetails={courseDetails}
        />
      )}
      {/* header */}
      <div
        className={`flex w-full items-center justify-between 
       p-5 text-2xl font-semibold text-[#65758C]`}
      >
        <div className='border-neutural-100 rounded-lg border' onClick={goBack}>
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
          {courseDetails.course_name}
        </p>
        <div
          className='flex items-center gap-1'
          onClick={() => setDetailsPopUp(true)}
        >
          <EditIcon width='22px' />
          <span
            className={`${outfit.className} py-1 text-[15px] font-medium text-[#385B8B]  `}
          >
            {courseDetails.created_by}
          </span>
        </div>
        <div className='my-1 flex'>
          <ColoredText classes='text-[#4ACB5F] bg-[#DAFFDA]' text='English' />
          <ColoredText classes='text-[#385B8B] bg-[#C7DEFF]' text='Hindi' />
        </div>
        <div className='flex justify-between'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            Cr.100
          </p>
          <p className='flex items-center text-[15px] font-bold text-[#787878]'>
            {courseDetails.credit_rating}
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
          <div
            className={`${
              option === 'overview'
                ? 'border-b-2  border-[#272728] font-semibold'
                : ''
            }`}
            onClick={() => setOption('overview')}
          >
            <p className='px-4 py-2.5 text-center text-[17px]  leading-6 tracking-[0.102px] text-[#272728]'>
              Overview
            </p>
          </div>
          <div
            className={`${
              option === 'competencies'
                ? 'border-b-2  border-[#272728] font-semibold'
                : ''
            }`}
            onClick={() => setOption('competencies')}
          >
            <p className=' px-4 py-2.5 text-center  text-[17px] leading-6 tracking-[0.102px] text-[#272728]'>
              Competencies
            </p>
          </div>
        </div>
        {/* two component */}
        <div>
          {option === 'overview' && <Overview />}
          {option === 'competencies' && <Competencies />}
        </div>
        {/* bottom button */}
        <div className='flex justify-center'>
          <ButtonFill
            onClick={() => setShowPopUp(true)}
            classes='w-[330px] h-[45px] bg-[#385B8B] text-[#fff] mt-5'
          >
            Buy Now Cr.145
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};
export default CourseDescription;
