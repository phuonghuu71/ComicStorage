import { SidebarItemProps } from "@ui/atoms";
import { Layout } from "@ui/organisms";

const SIDEBAR_ITEMS: SidebarItemProps[] = [
  {
    title: "Home",
    icon: "HomeIcon",
    href: "/dashboard/home",
  },
  {
    title: "Bookmark",
    icon: "BookmarkIcon",
    href: "/dashboard/bookmark",
  },
  {
    title: "Comic Storage",
    href: "/dashboard/comic",
    icon: "BoltIcon",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout sidebarItems={SIDEBAR_ITEMS}>{children}</Layout>;
}
