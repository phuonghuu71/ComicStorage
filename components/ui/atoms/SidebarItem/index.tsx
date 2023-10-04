"use client";

import { usePathname } from "next/navigation";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import DynamicIcon, { IconName } from "../DynamicIcon";
import Link from "next/link";
import React from "react";

/* eslint-disable-next-line */
export interface SidebarItemProps {
  title: string;
  icon: IconName;
  href: string;
  toggle?: boolean;
}

export function SidebarItem({ toggle, title, icon, href }: SidebarItemProps) {
  const pathname = usePathname();
  const [active, setActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (pathname.startsWith(href)) setActive(true);
    else setActive(false);
  }, [pathname, href]);

  return (
    <Link href={href}>
      <ListItem
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
