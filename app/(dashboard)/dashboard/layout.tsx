import { SidebarItemProps } from "@/components/ui/atoms/SidebarItem";
import Layout from "@/components/ui/organisms/DashboardLayout";

const SIDEBAR_ITEMS: SidebarItemProps[] = [
  {
    title: "Home",
    icon: "HomeIcon",
    href: "/dashboard",
    active: true,
  },
  {
    title: "Bookmark",
    icon: "BookmarkIcon",
    href: "/dashboard/bookmark",
    active: false,
  },
  {
    title: "Comic Storage",
    href: "/dashboard/comic",
    icon: "BoltIcon",
    active: false,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout sidebarItems={SIDEBAR_ITEMS}>{children}</Layout>;
}
