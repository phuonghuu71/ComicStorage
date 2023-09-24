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
  const [activeItem, setActiveItem] = React.useState<SidebarItemProps[]>(items);

  const activeHandler = (i: number) => {
    setActiveItem((prev) =>
      prev.map((item, k) => {
        if (k === i) return { ...item, active: true };
        return { ...item, active: false };
      })
    );
  };

  return (
    <List>
      {activeItem.map((item, i) => (
        <SidebarItem
          onClick={() => activeHandler(i)}
          key={i}
          {...item}
          toggle={toggle}
        />
      ))}
    </List>
  );
}

export default SidebarOptions;
