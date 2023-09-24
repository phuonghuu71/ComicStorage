"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  Button,
  Avatar,
  MenuList,
  Typography,
  MenuItem,
} from "@material-tailwind/react";

/* eslint-disable-next-line */
export interface ProfileMenuItemProps {
  label: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  click?: () => void;
}

export interface ProfileMenuProps {
  profileMenuItems: ProfileMenuItemProps[];
  avatarPhoto: string;
  className?: string;
}

export function ProfileMenu({
  avatarPhoto,
  profileMenuItems,
  className,
}: ProfileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className={`flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 ${className}`}
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="hp"
            className="border border-gray-900 p-0.5"
            src={avatarPhoto}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, click }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (click) click();

                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
