"use client";

import {
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

/* eslint-disable-next-line */
export interface MenuProps {
  title: string;
  menuItems: string[];
  searchable?: boolean;
}

function fetchMenu(cols: number) {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    case 11:
      return "grid-cols-11";
    case 12:
      return "grid-cols-12";

    default:
      return "";
  }
}

export function SingleMenu({ title }: { title: string }) {
  return (
    <Typography
      as={"li"}
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      <Link
        href={"/"}
        className="flex items-center gap-x-1 hover:bg-purple-500 hover:text-white px-2 py-1 rounded-md transition-colors"
      >
        {title}
      </Link>
    </Typography>
  );
}

export function MultiMenu({ title, menuItems, searchable }: MenuProps) {
  const cols: number = Math.floor(menuItems.length / 12);

  return (
    <Menu
      allowHover
      placement="bottom-start"
      // dismiss={{
      //   itemPress: false,
      // }}
    >
      <MenuHandler>
        <Typography
          as={"li"}
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <Link
            href={"/"}
            className="flex items-center gap-x-1 hover:bg-purple-500 hover:text-white px-2 py-1 rounded-md transition-colors"
          >
            {title}
          </Link>
        </Typography>
      </MenuHandler>
      {
        <MenuList className={`grid ${fetchMenu(cols)}`}>
          {searchable !== undefined && searchable === true ? (
            <Input
              crossOrigin={""}
              label="Search"
              containerProps={{
                className: "mb-4",
              }}
            />
          ) : null}
          {menuItems
            .sort((a, b) =>
              a[0].toLowerCase().localeCompare(b[0].toLowerCase())
            )
            .map((menuItem, index) => (
              <MenuItem key={index}>
                <Typography as={"a"} href={`/${menuItem.toLowerCase()}`}>
                  {menuItem}
                </Typography>
              </MenuItem>
            ))}
        </MenuList>
      }
    </Menu>
  );
}

export function MenuItems({ menuList }: { menuList: MenuProps[] }) {
  return (
    <ul className="items-center hidden lg:flex">
      {menuList.map((menuItem, index) =>
        menuItem.menuItems.length > 0 ? (
          <MultiMenu
            title={menuItem.title}
            key={index}
            menuItems={menuItem.menuItems}
            searchable={menuItem.searchable}
          />
        ) : (
          <SingleMenu title={menuItem.title} key={index} />
        )
      )}
    </ul>
  );
}

export default MenuItems;
