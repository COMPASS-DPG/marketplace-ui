'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';

import SwipeSlide from '@/components/SwipeSlide';

import { getMarketplaceCourses } from '@/redux/marketplace/action';
import { CourseType } from '@/redux/marketplace/marketplaceReducer';
import { AppDispatch, RootState } from '@/redux/store';

const OnGoingCourses = () => {
  const userId = localStorage.getItem('userId') ?? '';
  const dispatch: AppDispatch = useDispatch();
  const { ongoingCourses } = useSelector(
    (state: RootState) => state?.marketplace
  );
  useEffect(() => {
    if (!ongoingCourses) {
      dispatch(getMarketplaceCourses(userId));
    }
  }, [dispatch, userId, ongoingCourses]);

  return (
    <div className='px-5'>
      {ongoingCourses?.map((course: CourseType) => (
        <div key={course?.courseId}>
          <SwipeSlide course={course} />
        </div>
      ))}
    </div>
  );
};
export default OnGoingCourses;
