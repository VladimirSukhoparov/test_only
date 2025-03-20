import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { HistoryDate } from '../../types';
import './DataSwiper.scss';

interface DataSwiperProps {
  HISTORICDATES: HistoryDate[];
  currentEvent: number;
}
export const DataSwiper = ({
  HISTORICDATES,
  currentEvent,
}: DataSwiperProps) => {
  return (
    <>
      <p className='slider__mobile-title'>
        {HISTORICDATES[currentEvent].title}
      </p>
      <button className='slider__btn slider__btn_prev'></button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView={4}
        breakpoints={{
          300: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
        }}
        navigation={{
          prevEl: '.slider__btn_prev',
          nextEl: '.slider__btn_next',
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        {HISTORICDATES[currentEvent].events.map((item, index) => {
          const { date, description } = item;
          return (
            <SwiperSlide key={index} className='slider__slide'>
              <p className='slider__year'>{date}</p>
              <p className='slider__description'>{description}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button className='slider__btn slider__btn_next'></button>
    </>
  );
};
