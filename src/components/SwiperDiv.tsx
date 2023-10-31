import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import SwipeSlide from '@/components/SwipeSlide';
const SwiperDiv = () => {
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        pagination={true}
        slidesPerView={1}
      >
        <SwiperSlide>
          <SwipeSlide />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeSlide />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeSlide />
        </SwiperSlide>
        <SwiperSlide>
          <SwipeSlide />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default SwiperDiv;
