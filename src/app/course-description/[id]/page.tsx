'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsBookmark, BsFillBookmarkFill, BsShare } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ButtonFill from '@/components/buttons/ButtonFill';
import Competencies from '@/components/Competencies';
import { outfit } from '@/components/FontFamily';
import ColoredText from '@/components/heading/ColoredText';
import Overview from '@/components/Overview';
import BasicPopup from '@/components/popUp/BasicPopup';
import ButtonPopup from '@/components/popUp/ButtonPopup';

import {
  getPurchaseCourseStatus,
  purchasesACourse,
  removeCourse,
  saveACourse,
} from '@/redux/coursesDescription/action';
import {
  PURCHASE_COURSE_SUCCESS,
  SAVE_COURSE_SUCCESS,
  UNSAVE_COURSE_SUCCESS,
} from '@/redux/coursesDescription/type';
import { getMarketplaceCourses } from '@/redux/marketplace/action';
import { AppDispatch, RootState } from '@/redux/store';

import { EditIcon, Star } from '~/svg';

export type SingleCourseType = {
  id: number;
  title: string;
  description: string;
  courseLink: string;
  imgLink: string;
  credits: number;
  language: string[];
  duration: number;
  competency: {
    [key: string]: string[];
  };
  author: string;
  avgRating: number;
  updatedAt: string;
  providerName: string;
  numOfUsers: number;
  providerId: string;
};

const CourseDescription = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [DetailsPopUp, setDetailsPopUp] = useState<boolean>(false);
  const [option, setOption] = useState('overview');

  const { saveCourseStatus, purchaseCourseStatus, singleCourse, courseLink } =
    useSelector((state: RootState) => state?.singleCourse);

  const purchaseCourse = async () => {
    const payload = {
      courseId: singleCourse?.courseId,
      title: singleCourse?.title,
      description: singleCourse?.description,
      credits: singleCourse?.credits,
      imageLink: singleCourse?.imageLink,
      language: singleCourse?.language,
      courseLink: singleCourse?.courseLink,
      providerName: singleCourse?.providerName,
      avgRating: singleCourse?.avgRating,
      competency: singleCourse?.competency,
      providerId: singleCourse?.providerId,
      author: singleCourse?.author,
    };

    dispatch(purchasesACourse(userId, payload)).then((res: unknown) => {
      if ((res as { type?: string })?.type === PURCHASE_COURSE_SUCCESS) {
        toast.success('course purchase successfully', {
          draggable: false,
        });
        dispatch(getMarketplaceCourses(userId));
        setShowPopUp(false);
      }
    });
  };

  const handleCourseContinue = () => {
    if (courseLink) {
      window.open(courseLink, '_blank');
    } else {
      // if course link is null
      dispatch(getPurchaseCourseStatus(userId, singleCourse?.courseId));
      toast.warn('updating your course please wait', {
        draggable: false,
      });
    }
  };

  const handleSavedIconClick = async () => {
    if (saveCourseStatus) {
      dispatch(removeCourse(userId, singleCourse?.courseId)).then(
        (res: unknown) => {
          if ((res as { type?: string })?.type === UNSAVE_COURSE_SUCCESS) {
            toast.success('course unsaved successfully', {
              draggable: false,
            });
            dispatch(getMarketplaceCourses(userId));
          }
        }
      );
    } else {
      const payload = {
        courseId: singleCourse?.courseId,
        title: singleCourse?.title,
        description: singleCourse?.description,
        credits: singleCourse?.credits,
        imageLink: singleCourse?.imageLink
          ? singleCourse?.imageLink
          : singleCourse?.imgLink,
        language: singleCourse?.language,
        courseLink: singleCourse?.courseLink,
        providerName: singleCourse?.providerName,
        author: singleCourse?.author,
        avgRating: singleCourse?.avgRating,
        competency: singleCourse?.competency,
      };

      dispatch(saveACourse(userId, payload)).then((res: unknown) => {
        if ((res as { type?: string })?.type === SAVE_COURSE_SUCCESS) {
          toast.success('course saved successfully', {
            draggable: false,
          });
          dispatch(getMarketplaceCourses(userId));
        }
      });
    }
  };

  return (
    <div className={`${outfit.className}`}>
      {/* buy course popup */}
      {showPopUp && (
        <ButtonPopup
          credit={singleCourse?.credits}
          purchaseCourse={purchaseCourse}
          setShowPopUp={setShowPopUp}
        />
      )}
      {/* author Details popup */}
      {DetailsPopUp && (
        <BasicPopup
          setDetailsPopUp={setDetailsPopUp}
          courseDetails={singleCourse}
        />
      )}
      {/* header */}
      <div
        className={`flex w-full items-center justify-between 
       p-5 text-2xl font-semibold text-[#65758C]`}
      >
        <div
          className='cursor-pointer rounded-lg border border-neutral-100 hover:bg-slate-100'
          onClick={() => router.push('/marketplace')}
        >
          <MdOutlineKeyboardArrowLeft width='24px' className=' m-2' />
        </div>
        <div className='flex items-center justify-center gap-5 '>
          <div
            className='cursor-pointer rounded-lg border border-neutral-100 hover:bg-slate-200'
            onClick={handleSavedIconClick}
          >
            {saveCourseStatus ? (
              <BsFillBookmarkFill width='24px' className=' m-2' />
            ) : (
              <BsBookmark width='24px' className=' m-2' />
            )}
            {/* or */}
          </div>
          <div className='cursor-pointer rounded-lg border border-neutral-100 hover:bg-slate-200'>
            <BsShare width='24px' className=' m-2' />
          </div>
        </div>
      </div>
      {/* description */}
      <div className='px-5 py-2'>
        <Image
          className='rounded-xl'
          src={singleCourse?.imageLink}
          alt='course-description-image'
          width={350}
          height={250}
        />
        <p className='pt-3 text-[18px] font-extrabold  text-[#272728]'>
          {singleCourse?.title}
        </p>
        <div
          className='my-1 flex cursor-pointer items-center gap-1'
          onClick={() => setDetailsPopUp(true)}
        >
          <EditIcon width='22px' />
          <span
            className={`${outfit.className} py-1 text-[15px] font-medium uppercase text-[#385B8B]  `}
          >
            {singleCourse?.providerName || 'DUMMY PROVIDER'}
          </span>
        </div>
        <div className='my-1 flex gap-1'>
          {singleCourse?.language?.map((item: string, index: number) => (
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
        <div className='flex justify-between'>
          <p className='text-[16px] font-semibold leading-6 text-[#272728]	'>
            Cr. {singleCourse?.credits}
          </p>
          <p className='flex items-center text-[15px] font-bold text-[#787878]'>
            {singleCourse?.avgRating ?? '--'}
            <span className='pl-0.5'>
              <Star width='12px' />
            </span>
          </p>
        </div>
      </div>
      {/* member tab */}
      <div className='flex items-center gap-1 px-5 text-[16px] text-[#65758C]'>
        <GoPeople />
        <p>{singleCourse?.numberOfPurchases} Members</p>
      </div>
      <hr className='mb-5 mt-4 h-[1px] text-[#F4F4F4]' />
      {/* Overview and competency */}

      <div className='px-5'>
        <div className='flex justify-center gap-5 '>
          <div
            className={`cursor-pointer ${
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
            className={`cursor-pointer ${
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
          {option === 'overview' && (
            <Overview about={singleCourse?.description} />
          )}
          {option === 'competencies' && (
            <Competencies competency={singleCourse?.competency} />
          )}
        </div>
        {/* bottom button */}
        <div className='flex justify-center'>
          <ButtonFill
            onClick={() =>
              purchaseCourseStatus ? handleCourseContinue() : setShowPopUp(true)
            }
            classes='flex-grow h-[45px] bg-[#385B8B] text-[#fff] mt-5'
          >
            {purchaseCourseStatus
              ? 'Continue'
              : `Buy Now Cr. ${singleCourse?.credits}`}
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};
export default CourseDescription;
