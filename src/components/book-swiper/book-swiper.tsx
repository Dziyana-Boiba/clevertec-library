import React, { useState } from 'react';
import { Controller, FreeMode, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as CatIcon } from '../../assets/images/Icon_Cat.svg';
import { ImageType } from '../../types/books';

import './book-swiper.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

type Props = {
  images: ImageType[] | null;
  id: number;
};

export const BookSwiper = ({ images, id }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | any>(null);

  return (
    <div className='book-swiper-wrapper'>
      {!images && (
        <React.Fragment>
          <div className='swiper-top' data-test-id='slide-big'>
            <CatIcon />
          </div>
          <div className='swiper-mobile-cat'>
            <CatIcon />
          </div>
        </React.Fragment>
      )}
      {images && images.length > 0 && (
        <div>
          <Swiper
            loop={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, Controller]}
            className='swiper-top'
          >
            {images.map(({ url }: ImageType) => (
              <SwiperSlide key={'top'.concat(url ? url : '')}>
                <img
                  src={url ? require(`../../assets/library-data/covers/${id}.webp`) : ''}
                  alt='The page of the book'
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper pagination={true} modules={[Pagination]} className='swiper-mobile'>
            {images.map(({ url }: ImageType) => (
              <SwiperSlide key={'mobile'.concat(url ? url : id.toString())}>
                <img
                  src={url ? require(`../../assets/library-data/covers/${id}.webp`) : ''}
                  alt='The page of the book'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {images && images.length > 1 && (
        <div>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={30}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            scrollbar={{ hide: true, dragSize: 190 }}
            centerInsufficientSlides={true}
            modules={[Scrollbar, Controller, Thumbs]}
            className='swiper-bottom'
          >
            {images.length > 0 &&
              images.map(({ url }: ImageType) => (
                <SwiperSlide key={'bottom'.concat(url ? url : '')}>
                  <img
                    src={url ? require(`../../assets/library-data/covers/${id}.webp`) : ''}
                    alt='The page of the book'
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
