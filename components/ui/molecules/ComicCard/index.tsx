"use client";

import { ClockIcon, UserIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import Image from "next/image";

/* eslint-disable-next-line */
export interface ComicCardProps {
  title: string;
  imgUrl: string;
  desc: string | JSX.Element | JSX.Element[];
  uploader: string;
  lastUpdated: string;
  commentCount: number;
  chapterCount: number;
  onClick?: () => void;
}

export function ComicCard({
  title,
  imgUrl,
  desc,
  uploader,
  lastUpdated,
  commentCount,
  chapterCount,
  onClick,
}: ComicCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer group shadow-none border border-blue-gray-100 flex-row mb-4 last:mb-0"
    >
      <CardHeader className="max-w-[200px] max-h-[180px] shrink-0 w-full m-0 rounded-tr-none rounded-br-none shadow-none hidden lg:block">
        <Image
          src={imgUrl}
          width={500}
          height={500}
          className="group-hover:scale-105 w-full min-h-[180px] object-cover object-center transition-transform"
          alt="cover"
        />
      </CardHeader>
      <div className="flex flex-col justify-between flex-1">
        <CardBody className="p-2">
          <Typography
            as={"h2"}
            className="font-medium text-purple-500 leading-5 text-lg"
          >
            {title}
          </Typography>

          <Typography as={"div"} className="line-clamp-2">
            {desc}
          </Typography>
        </CardBody>
        <CardFooter className="p-2 bg-gray-50 rounded-br-xl shadow-none">
          <Typography className="flex gap-x-2 items-center text-purple-500 font-medium text-lg">
            <UserIcon className="w-4 h-4" strokeWidth={2.5} /> {uploader}
          </Typography>

          <div className="flex justify-between items-center">
            <Typography
              as={"p"}
              className="flex items-center gap-x-2 font-medium"
            >
              <ClockIcon className="w-4 h-4" strokeWidth={2.5} />
              {lastUpdated}
            </Typography>

            <Typography as={"p"} className="font-medium">
              {chapterCount} chapters
            </Typography>

            <Typography as={"p"} className="font-medium">
              {commentCount} comments
            </Typography>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ComicCard;
