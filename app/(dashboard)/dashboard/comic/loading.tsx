"use client";

import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
