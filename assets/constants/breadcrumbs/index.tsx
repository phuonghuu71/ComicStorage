"use client";

import { BreadcrumbProps } from "@ui/molecules/BreadcrumbList";
import { HomeIcon } from "@heroicons/react/24/outline";

export const BC_DASHBOARD_COMIC: BreadcrumbProps[] = [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    desc: "Comic Storage",
    href: "",
  },
];

export const BC_DASHBOARD_COMIC_ADD: BreadcrumbProps[] = [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    desc: "Comic Storage",
    href: "/dashboard/comic",
  },
  {
    desc: "Add",
    href: "",
  },
];

export const BC_DASHBOARD_COMIC_EDIT = (
  comicName: string | React.ReactNode
): BreadcrumbProps[] => {
  return [
    {
      desc: <HomeIcon className="w-4 h-4" />,
      href: "/dashboard",
    },
    {
      desc: "Comic Storage",
      href: "/dashboard/comic",
    },
    {
      desc: "Edit",
      href: "",
    },
    {
      desc: comicName,
      href: "",
    },
  ];
};

export const BC_DASHBOARD_CHAPTERS = (
  comicName: string | React.ReactNode
): BreadcrumbProps[] => [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    desc: "Comic Storage",
    href: "/dashboard/comic",
  },
  {
    desc: comicName,
    href: "",
  },
  {
    desc: "Chapters",
    href: "",
  },
];

export const BC_DASHBOARD_CHAPTERS_ADD = (
  comicName: string | React.ReactNode,
  comicId?: string
): BreadcrumbProps[] => [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    desc: "Comic Storage",
    href: "/dashboard/comic",
  },
  {
    desc: comicName,
    href: `/dashboard/comic/${comicId}/chapters`,
  },
  {
    desc: "Chapters",
    href: "",
  },
  {
    desc: "Add",
    href: "",
  },
];

export const BC_DASHBOARD_CHAPTERS_EDIT = (
  comicName: string | React.ReactNode,
  comicId?: string
): BreadcrumbProps[] => [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    desc: "Comic Storage",
    href: "/dashboard/comic",
  },
  {
    desc: comicName,
    href: `/dashboard/comic/${comicId}/chapters`,
  },
  {
    desc: "Chapters",
    href: "",
  },
  {
    desc: "Edit",
    href: "",
  },
];

export const BC_COMIC = (
  comicName: string | React.ReactNode,
  comicId?: string
): BreadcrumbProps[] => [
  {
    desc: <HomeIcon className="w-4 h-4" />,
    href: "/",
  },
  {
    desc: comicName,
    href: "/",
  },
];
