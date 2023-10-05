"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

/* eslint-disable-next-line */
export interface HeroCardProps {
  imageUrl: string;
  title: string;
}

export function HeroCard({ imageUrl, title }: HeroCardProps) {
  return (
    <Card className="mx-auto max-w-56 max-h-[20rem] items-center relative group overflow-hidden">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-b after:from-transparent after:to-black after:opacity-60 relative"
      >
        <Image
          src={imageUrl}
          width={9999}
          height={9999}
          className="min-h-[20rem] w-full object-cover object-center group-hover:scale-105 transition-all"
          alt="cover"
        />
      </CardHeader>

      <CardBody className="absolute z-10 bottom-0">
        <Typography
          as={"p"}
          className="text-center line-clamp-2 text-base text-white font-medium"
        >
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default HeroCard;
