"use client";

import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import SidebarOptions from "../../molecules/SidebarOptions";
import { SidebarItemProps } from "../../atoms/SidebarItem";
import Profile from "../Profile";
import { PROFILE_MENU_ITEMS } from "@/assets/constants/navigation";

export default function Layout({
  children,
  sidebarItems,
}: {
  children: React.ReactNode;
  sidebarItems: SidebarItemProps[];
}) {
  const [toggle, setToggle] = React.useState<boolean>(true);

  return (
    <div className="flex h-screen w-screen">
      <div
        className={`max-w-[300px] p-4 ${
          toggle ? "w-full" : "w-28"
        } transition-all border-r-2 border-blue-gray-50 bg-white`}
      >
        <Typography
          as={"a"}
          href="/"
          className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-xl"
        >
          Comics
        </Typography>

        <SidebarOptions toggle={toggle} items={sidebarItems} />
      </div>

      <div className="flex-1 bg-blue-gray-50 flex flex-col">
        <nav className="flex justify-between items-center w-full p-2 bg-white border-b-2 border-b-blue-gray-50">
          <IconButton
            variant="text"
            className=""
            onClick={() => setToggle(!toggle)}
          >
            <Bars3BottomLeftIcon className="w-5 h-5" />
          </IconButton>

          <Profile profileMenuItems={PROFILE_MENU_ITEMS} />
        </nav>

        <div className="flex-1 p-4 max-h-max">{children}</div>
      </div>
    </div>
  );
}
