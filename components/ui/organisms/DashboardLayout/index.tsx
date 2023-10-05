"use client";

import React from "react";

import { PROFILE_MENU_ITEMS } from "@assets/navigation";

import { SidebarItemProps } from "../../atoms/SidebarItem";
import DynamicIcon from "../../atoms/DynamicIcon";
import SidebarOptions from "../../molecules/SidebarOptions";
import Profile from "../Profile";

import { IconButton, Typography } from "@material-tailwind/react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";

export function DashboardLayout({
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
        <div className="px-3 flex items-center gap-x-2 mb-4">
          <div className="rounded-full border-2 border-purple-500 p-2 w-fit">
            <DynamicIcon
              icon="PaintBrushIcon"
              className="w-4 h-4 text-purple-500"
            />
          </div>
          {toggle && (
            <Typography
              as={"a"}
              href="/"
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-xl"
            >
              Comics
            </Typography>
          )}
        </div>

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

export default DashboardLayout;
