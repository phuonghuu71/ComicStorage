"use client";

import { Avatar, Typography } from "@material-tailwind/react";
import { DateTime } from "luxon";
import parse from "html-react-parser";

export interface CommentProps {
  avatar: string;
  name: string;
  message: string;
  timestamp: string;
  chapterName: string;
  comicName: string;
}

export function Comment({
  avatar,
  name,
  message,
  timestamp,
  chapterName,
  comicName,
}: CommentProps) {
  return (
    <>
      <div className="w-full flex gap-x-2 mb-2">
        <div className="max-h-5 max-w-5 mt-1">
          <Avatar
            variant="circular"
            size="sm"
            alt="hp"
            className="border border-gray-900 p-0.5"
            src={avatar}
          />
        </div>

        <div className="flex flex-col flex-1 p-2 bg-white rounded-xl rounded-tl-none">
          <div className="flex justify-between items-center">
            <Typography
              as={"a"}
              variant="h4"
              className="text-sm font-medium text-purple-500"
              href="/"
            >
              {name}
            </Typography>

            <Typography
              as={"a"}
              variant="h4"
              className="text-xs font-normal"
              href="/"
            >
              {DateTime.fromISO(timestamp).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </Typography>
          </div>

          <Typography as={"div"} className="line-clamp-3 mb-2">
            {parse(message)}
          </Typography>

          <Typography
            as={"a"}
            variant="h4"
            className="text-sm font-normal text-purple-500 self-end"
            href="/"
          >
            {chapterName} - {comicName}
          </Typography>
        </div>
      </div>

      <hr className="last:hidden mb-2" />
    </>
  );
}

export default Comment;
