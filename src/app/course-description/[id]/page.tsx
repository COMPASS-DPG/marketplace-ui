'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsBookmark, BsFillBookmarkFill, BsShare } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import ButtonFill from '@/components/buttons/ButtonFill';
import Competencies from '@/components/Competencies';
import { outfit } from '@/components/FontFamily';
import ColoredText from '@/components/heading/ColoredText';
import Overview from '@/components/Overview';
import BasicPopup from '@/components/popUp/BasicPopup';
import ButtonPopup from '@/components/popUp/ButtonPopup';

import {
  checkSavedStatus,
  fetchSingleCourse,
  getSavedCourse,
  purchasesACourse,
  saveACourse,
  unsaveACourse,
} from '@/services/marketplaceServices';

import CourseFullImage from '../../../../public/images/courseFullImage.png';

export const getSingleCourseValue = (): SingleCourseType => {
  return {
    id: 1,
    title: 'Introduction to Programming',
    competency: {
      'Pregnancy Identification': [
        'Understands health of males and females and initial assessment protocols',
        'Identifies pregnancy using Nischaya Kit',
      ],
      'Pregnancy Identification 2': [
        'Understands health of males and females and initial assessment protocols',
        'Identifies pregnancy using Nischaya Kit',
      ],
      'Pregnancy Identification 3': [
        'Understands health of males and females and initial assessment protocols',
        'Identifies pregnancy using Nischaya Kit',
      ],
    },
    avgRating: 4,
    credits: 100,
    language: ['One', 'Two', 'Three'],
    imgLink: '../../../public/images/courseImage.png',
    courseLink: '../../../public/images/courseImage.png',
    duration: 2,
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatuNemo enim ipsam voluptatem quia volupta sit aspernatur aut odit aut fugit, sunt in culpa qui officia deserunt mollit anim id essed quia consequuntur maExcepteur sint occaecat  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
    author: 'dummyAuthore',
    updatedAt: '24-aug-2024',
    providerName: 'Dummy Provider',
    numOfUsers: 47,
    providerId: '123e4567-e89b-42d3-a456-556642440011',
  };
};

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

import { useMarketPlaceContext } from '@/app/context/MarketPlaceUserContext';

import { EditIcon, Star } from '~/svg';

const CourseDescription = () => {
  const { setsavedCourses } = useMarketPlaceContext();
  const userId = localStorage.getItem('userId') ?? '';
  const router = useRouter();
  const { id } = useParams();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [DetailsPopUp, setDetailsPopUp] = useState<boolean>(false);
  const [option, setOption] = useState('overview');
  const [isSavedCourse, setIsSavedCourse] = useState<boolean>(false);
  const [courseDetails, setCourseDetails] =
    useState<SingleCourseType>(getSingleCourseValue);
  //share course button
  const handleShareClick = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${courseDetails?.title}`,
        text: 'Check out this amazing Course!',
        url: window.location.href,
      });
    } else {
      toast.error('Share option is not supported in this browser.');
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const courseId = Array.isArray(id) ? id[0] : id;
        const response = await fetchSingleCourse(courseId);
        const response2 = await checkSavedStatus(userId, Number(courseId));
        if (response2) {
          setIsSavedCourse(true);
        }
        setCourseDetails(response);
      } catch (error) {
        toast.error('something went wrong');
      }
    };
    fetchDetails();
  }, [userId, id]);

  const purchaseCourse = async () => {
    try {
      const payload = {
        courseId: courseDetails?.id,
        title: courseDetails?.title,
        description: courseDetails?.description,
        credits: courseDetails?.credits,
        imageLink: courseDetails?.imgLink,
        language: courseDetails?.language,
        courseLink: courseDetails?.courseLink,
        providerName: courseDetails?.providerName,
        avgRating: courseDetails?.avgRating,
        competency: courseDetails?.competency,
        author: courseDetails?.author,
      };
      await purchasesACourse(userId, payload);
      router.push('/ongoing-courses');
      //  setLoading(false);
    } catch (error) {
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);

      setShowPopUp(false);
    }
  };
  const handleSavedIconClick = async () => {
    try {
      if (isSavedCourse) {
        await unsaveACourse(userId, parseInt(Array.isArray(id) ? id[0] : id));
        setIsSavedCourse(false);
        const response = await getSavedCourse(userId);
        setsavedCourses(response);
        toast.success('course unsaved successfully');
      } else {
        const payload = {
          author: courseDetails?.author,
          courseId: courseDetails?.id,
          title: courseDetails?.title,
          description: courseDetails?.description,
          credits: courseDetails?.credits,
          imageLink: courseDetails?.imgLink,
          language: courseDetails?.language,
          courseLink: courseDetails?.courseLink,
          providerName: courseDetails?.providerName,
          avgRating: courseDetails?.avgRating,
          competency: courseDetails?.competency,
        };

        await saveACourse(userId, payload);
        const response = await getSavedCourse(userId);
        setsavedCourses(response);
        toast.success('course saved successfully');
        setIsSavedCourse(true);
      }
    } catch (error) {
      toast.error('something went wrong');
      // Handle any errors that occur during the API call
      // eslint-disable-next-line no-console
      console.error('API call error:', error);
    }
  };

  return (
    <div className={`${outfit.className}`}>
      {/* buy course popup */}
      {showPopUp && (
        <ButtonPopup
          purchaseCourse={purchaseCourse}
          setShowPopUp={setShowPopUp}
        />
      )}
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
        <div
          className='border-neutural-100 rounded-lg border'
          onClick={() => router.back()}
        >
          <MdOutlineKeyboardArrowLeft width='24px' className=' m-2' />
        </div>
        <div className='flex items-center justify-center gap-5'>
          <div
            className='border-neutural-100 rounded-lg border'
            onClick={handleSavedIconClick}
          >
            {isSavedCourse ? (
              <BsFillBookmarkFill width='24px' className=' m-2' />
            ) : (
              <BsBookmark width='24px' className=' m-2' />
            )}
            {/* or */}
          </div>
          <div className='border-neutural-100 rounded-lg border'>
            <BsShare
              width='24px'
              className=' m-2'
              onClick={() => handleShareClick()}
            />
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
          {courseDetails?.title}
        </p>
        <div
          className='my-1 flex items-center gap-1'
          onClick={() => setDetailsPopUp(true)}
        >
          <EditIcon width='22px' />
          <span
            className={`${outfit.className} py-1 text-[15px] font-medium uppercase text-[#385B8B]  `}
          >
            {courseDetails?.providerName || 'DUMMY PROVIDER'}
          </span>
        </div>
        <div className='my-1 flex gap-1'>
          {courseDetails?.language?.map((item, index) => (
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
            Cr. {courseDetails.credits}
          </p>
          <p className='flex items-center text-[15px] font-bold text-[#787878]'>
            {courseDetails?.avgRating ?? '--'}
            <span className='pl-0.5'>
              <Star width='12px' />
            </span>
          </p>
        </div>
      </div>
      {/* member tab */}
      <div className='flex items-center gap-1 px-5 text-[16px] text-[#65758C]'>
        <GoPeople />
        <p>{courseDetails?.numOfUsers} Members</p>
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
          {option === 'overview' && (
            <Overview about={courseDetails?.description} />
          )}
          {option === 'competencies' && (
            <Competencies competency={courseDetails?.competency} />
          )}
        </div>
        {/* bottom button */}
        <div className='flex justify-center'>
          <ButtonFill
            onClick={() => setShowPopUp(true)}
            classes='flex-grow h-[45px] bg-[#385B8B] text-[#fff] mt-5'
          >
            Buy Now &nbsp;&nbsp; Cr. {courseDetails?.credits}
          </ButtonFill>
        </div>
      </div>
    </div>
  );
};
export default CourseDescription;
