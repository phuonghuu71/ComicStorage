"use client";

import { Typography } from "@material-tailwind/react";

/* eslint-disable-next-line */
export interface TitleProps {
  title: string;
  description?: string;
  containerClass?: string;
}

export function Title({ title, description, containerClass }: TitleProps) {
  return (
    <div className={containerClass}>
      <Typography
        as={"h2"}
        className="px-2 mb-2 text-xl font-medium text-purple-500 flex gap-x-2 items-center self-start"
      >
        {title}
      </Typography>

      {description && (
        <Typography as={"p"} className="px-2">
          {description}
        </Typography>
      )}
    </div>
  );
}

export default Title;
