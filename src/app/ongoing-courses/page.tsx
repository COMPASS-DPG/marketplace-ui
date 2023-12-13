'use client';
import { useSelector } from 'react-redux';
import 'swiper/css';

import SwipeSlide from '@/components/SwipeSlide';

import { RootState } from '@/redux/store';

export type OnGoingCoursesType = {
  id: number;
  courseId: number;
  becknTransactionId: string;
  consumerId: string;
  feedback: string;
  purchasedAt: Date | undefined | string;
  rating: number | null;
  status: string;
  walletTransactionId: number;
  CourseInfo: {
    title: string;
    description: string;
    credits: number;
    imageLink: string;
    language: string[];
    courseLink: string;
    providerName: string;
    author: string;
    avgRating: number;
    bppUrl: string;
    competency: {
      [competency: string]: string[];
    };
    courseId: number;
    numberOfPurchases: number;
  };
};

const OnGoingCourses = () => {
  const { ongoingCourses } = useSelector(
    (state: RootState) => state?.marketplace
  );

  return (
    <div className='px-5'>
      {ongoingCourses?.map((course: OnGoingCoursesType) => (
        <div key={course?.courseId}>
          <SwipeSlide course={course} />
        </div>
      ))}
    </div>
  );
};
export default OnGoingCourses;
