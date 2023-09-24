"use client";

import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import DynamicIcon, { IconName } from "../DynamicIcon";
import { MouseEventHandler } from "react";
import Link from "next/link";

/* eslint-disable-next-line */
export interface SidebarItemProps {
  toggle?: boolean;
  title: string;
  icon: IconName;
  href: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function SidebarItem({
  toggle,
  title,
  icon,
  active,
  href,
  onClick,
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <ListItem
        onClick={onClick}
        className={`${!toggle && "w-fit"} mb-1 last:mb-0 ${
          active && "!bg-purple-400 !text-white"
        }`}
      >
        <ListItemPrefix className={`${!toggle && "mr-0"}`}>
          <DynamicIcon
            solid
            icon={icon}
            className={`${
              !toggle && "scale-150 text-purple-500"
            } w-5 h-5 transition-all ${active && "text-white"}`}
          />
        </ListItemPrefix>
        {toggle && title}
      </ListItem>
    </Link>
  );
}

export default SidebarItem;
