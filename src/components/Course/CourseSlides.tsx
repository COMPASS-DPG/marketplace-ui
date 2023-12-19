import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import CourseCard from '@/components/Course/CourseCard';

import { CourseType } from '@/redux/marketplace/marketplaceReducer';

import NoCoursesFound from './NoCoursesFound';

const CourseSlides = ({ CoursesList }: { CoursesList: CourseType[] }) => {
  const spaceBetween = CoursesList?.length > 1 ? -10 : 0;

  return (
    <>
      {CoursesList?.length > 0 ? (
        <div className='flex gap-2 px-4'>
          <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={1}
            autoplay={false}
          >
            {CoursesList?.map((course) => {
              return (
                <SwiperSlide key={course?.courseId}>
                  <CourseCard courseDetails={course} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className='flex justify-center'>
          <NoCoursesFound />
        </div>
      )}
    </>
  );
};
export default CourseSlides;
