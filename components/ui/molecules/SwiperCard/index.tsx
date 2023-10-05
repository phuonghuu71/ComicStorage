"use client";

// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { IconButton } from "@material-tailwind/react";

/* eslint-disable-next-line */
export interface SwiperCardProps {
  children: React.ReactNode;
}

export function SwiperCard({ children }: SwiperCardProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={2}
      spaceBetween={10}
      navigation={{
        prevEl: ".prev",
        nextEl: ".next",
      }}
      autoplay
      loop
      breakpoints={{
        768: {
          spaceBetween: 10,
          slidesPerView: 5,
        },
      }}
    >
      {children}

      <IconButton className="prev">
        <ChevronLeftIcon className="w-5 h-5" />
      </IconButton>

      <IconButton className="next">
        <ChevronRightIcon className="w-5 h-5" />
      </IconButton>
    </Swiper>
  );
}

export default SwiperCard;
