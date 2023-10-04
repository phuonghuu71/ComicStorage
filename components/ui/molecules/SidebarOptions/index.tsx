"use client";

import { List } from "@material-tailwind/react";
import SidebarItem, { SidebarItemProps } from "../../atoms/SidebarItem";
import React from "react";

/* eslint-disable-next-line */
export interface SidebarOptionsProps {
  items: SidebarItemProps[];
  toggle: boolean;
}

export function SidebarOptions({ items, toggle }: SidebarOptionsProps) {
  return (
    <List>
      {items.map((item, i) => (
        <SidebarItem key={i} toggle={toggle} {...item} />
      ))}
    </List>
  );
}

export default SidebarOptions;
