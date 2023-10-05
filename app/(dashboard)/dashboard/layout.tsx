import { SidebarItemProps } from "@ui/atoms/SidebarItem";
import { DashboardLayout } from "@ui/organisms/DashboardLayout";

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

export default function DashboarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebarItems={SIDEBAR_ITEMS}>{children}</DashboardLayout>
  );
}
