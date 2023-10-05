"use client";

import { SwiperCard, HeroCard, ComicCardProps } from "@ui/molecules";

import { SwiperSlide } from "swiper/react";

export function HeroSwiperList({ comics }: { comics: ComicCardProps[] }) {
  return (
    <SwiperCard>
      {comics.map((comic, index) => (
        <SwiperSlide key={index}>
          <HeroCard imageUrl={comic.imgUrl} title={comic.title} />
        </SwiperSlide>
      ))}
    </SwiperCard>
  );
}

export default HeroSwiperList;
