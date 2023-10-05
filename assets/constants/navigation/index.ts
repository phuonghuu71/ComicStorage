import { ProfileMenuItemProps } from "@ui/molecules/ProfileMenu";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { signOut } from "next-auth/react";
import { MenuProps } from "@/components/ui/molecules/MenuItems";

// profile menu component
export const PROFILE_MENU_ITEMS: ProfileMenuItemProps[] = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    click: () => signOut(),
  },
];

export const CATEGORY_MENU_ITEMS: MenuProps[] = [
  {
    title: "Home",
    menuItems: [],
  },
  {
    title: "Category",
    menuItems: [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Josei",
      "Manga",
      "Manhua",
      "Manhwa",
      "Mystery",
      "Romance",
      "School Life",
      "Sci-fi",
      "Shoujo",
      "Shounen",
      "Slice of Life",
      "Tragedy",
      "Fantasy",
      "Historical",
      "Gender Bender",
      "Harem",
      "Martial Arts",
      "Mecha",
      "Psychological",
      "Horror",
      "Comic",
    ],
  },
  {
    title: "Status",
    menuItems: ["Incomplete", "Complete"],
  },
];
