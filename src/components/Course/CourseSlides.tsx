import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import CourseCard from '@/components/Course/CourseCard';

import { CourseType } from '@/app/context/MarketPlaceUserContext';

const CourseSlides = ({ CoursesList }: { CoursesList: CourseType[] }) => {
  const spaceBetween = CoursesList.length > 1 ? '0' : '0';
  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={1} autoplay={false}>
      {CoursesList.map((course) => {
        return (
          <SwiperSlide key={course?.courseId}>
            <CourseCard courseDetails={course} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default CourseSlides;
