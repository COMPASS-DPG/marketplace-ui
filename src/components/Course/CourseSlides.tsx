import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import CourseCard from '@/components/Course/CourseCard';

import { CourseType } from '@/app/context/MarketPlaceUserContext';

const CourseSlides = ({ CoursesList }: { CoursesList: CourseType[] }) => {
  return (
    <Swiper spaceBetween={-10} slidesPerView={1}>
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
