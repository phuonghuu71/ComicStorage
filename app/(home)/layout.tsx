import { CATEGORY_MENU_ITEMS } from "@assets/navigation";
import { Header, Footer } from "@ui/templates";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-4 max-w-screen-sm lg:max-w-screen-2xl container mx-auto w-full">
        <div className="w-screen h-screen fixed top-0 left-0 -z-50 bg-blue-gray-50" />
        <Header menu={CATEGORY_MENU_ITEMS} />
        {children}
        <Footer />
      </div>
    </>
  );
}
