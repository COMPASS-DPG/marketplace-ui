import { useSelector } from 'react-redux';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import SwipeSlide from '@/components/SwipeSlide';

import { OnGoingCoursesType } from '@/app/ongoing-courses/page';
import { RootState } from '@/redux/store';

const SwiperDiv = () => {
  const { ongoingCourses } = useSelector(
    (state: RootState) => state?.marketplace
  );
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        pagination={true}
        slidesPerView={1}
      >
        {ongoingCourses?.map((course: OnGoingCoursesType) => (
          <SwiperSlide key={course?.courseId}>
            <SwipeSlide course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SwiperDiv;
