"use client";

import React from "react";

import { PROFILE_MENU_ITEMS } from "@assets/navigation";

import OutlineInput from "../../molecules/OutlineInput";
import Navigation from "../../molecules/Navigation";
import MenuItems, { MenuProps } from "../../molecules/MenuItems";
import Profile from "../../organisms/Profile";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export interface HeaderProps {
  menu: MenuProps[];
}

export function Header({ menu }: HeaderProps) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <Navigation
      slogan="Comics"
      mobileChildren={
        <>
          <OutlineInput text="Search" type="search" />
          <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              What is Material Tailwind?
            </AccordionHeader>
            <AccordionBody>
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion>
        </>
      }
    >
      <MenuItems menuList={menu} />

      <OutlineInput
        className="hidden lg:flex ml-auto"
        text="Search"
        type="search"
      />

      {/* <Profile profileMenuItems={PROFILE_MENU_ITEMS} /> */}
    </Navigation>
  );
}

export default Header;
