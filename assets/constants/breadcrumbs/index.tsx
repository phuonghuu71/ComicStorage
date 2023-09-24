import { BreadcrumbProps } from "@/components/ui/molecules/BreadcrumbList";
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
