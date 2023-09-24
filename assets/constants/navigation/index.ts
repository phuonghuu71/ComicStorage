import { ProfileMenuItemProps } from "@ui/molecules/ProfileMenu";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

import { signOut } from "next-auth/react";

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
