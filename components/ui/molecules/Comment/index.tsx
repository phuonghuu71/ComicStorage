"use client";

import { Avatar, Typography } from "@material-tailwind/react";

export function Comment() {
  return (
    <>
      <div className="w-full flex gap-x-2 mb-2">
        <div className="max-h-5 max-w-5 mt-1">
          <Avatar
            variant="circular"
            size="sm"
            alt="hp"
            className="border border-gray-900 p-0.5"
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
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
              Hữu Phương
            </Typography>

            <Typography
              as={"a"}
              variant="h4"
              className="text-xs font-normal"
              href="/"
            >
              10/09/03 - 09:09 PM
            </Typography>
          </div>

          <Typography as={"p"} className="line-clamp-3 mb-2">
            {`Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.`}
          </Typography>

          <Typography
            as={"a"}
            variant="h4"
            className="text-sm font-normal text-purple-500 self-end"
            href="/"
          >
            Chapter 21 - One Piece
          </Typography>
        </div>
      </div>

      <div className="w-full h-px bg-purple-500 mb-2 last:hidden" />
    </>
  );
}

export default Comment;
