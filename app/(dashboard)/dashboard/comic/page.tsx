import { BC_DASHBOARD_COMIC } from "@/assets/constants/breadcrumbs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/ui/atoms/Container";
import BreadcrumbList from "@/components/ui/molecules/BreadcrumbList";
import ComicStorage from "@/components/ui/organisms/ComicStorage";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Comic Storage",
  description: "A place to store your comics",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <div className="flex flex-col">
      <BreadcrumbList data={BC_DASHBOARD_COMIC} />
      <Container className="flex-1 w-full overflow-y-scroll flex flex-col pt-0">
        <ComicStorage userId={session.user.id} />
      </Container>
    </div>
  );
}
