import { BC_DASHBOARD_COMIC } from "@assets/breadcrumbs";
import { Container } from "@ui/atoms";
import { BreadcrumbList } from "@ui/molecules";
import { ComicStorage } from "@ui/organisms";

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../../../api/auth/[...nextauth]/route";

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
