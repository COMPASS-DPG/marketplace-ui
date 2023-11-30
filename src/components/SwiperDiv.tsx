import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import SwipeSlide from '@/components/SwipeSlide';

import { useMarketPlaceContext } from '@/app/context/MarketPlaceUserContext';
const SwiperDiv = () => {
  const { ongoingCourses } = useMarketPlaceContext();
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        pagination={true}
        slidesPerView={1}
      >
        {ongoingCourses?.map((course, index) => (
          <SwiperSlide key={index}>
            <SwipeSlide course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SwiperDiv;
