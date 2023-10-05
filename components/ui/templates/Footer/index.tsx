"use client";

import { Typography } from "@material-tailwind/react";

export function Footer() {
  return (
    <footer className="border border-blue-gray-100 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center bg-white py-2 px-5 rounded-2xl">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 Huu Phuong
      </Typography>
    </footer>
  );
}

export default Footer;
