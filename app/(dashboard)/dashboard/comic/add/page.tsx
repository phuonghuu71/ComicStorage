import { GENRE, STATUS } from "@/assets/constants/category";
import { BC_DASHBOARD_COMIC_ADD } from "@/assets/constants/breadcrumbs";
import Title from "@/components/ui/atoms/Title";
import BreadcrumbList from "@/components/ui/molecules/BreadcrumbList";
import Container from "@/components/ui/atoms/Container";
import FormAddEditComic from "@/components/ui/organisms/FormAddEditComic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Add Comic",
  description: "Adding your Comic to Database",
};


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <div className={`flex flex-col h-full`}>
      <BreadcrumbList data={BC_DASHBOARD_COMIC_ADD} />

      <Container className="flex-1 overflow-y-scroll flex flex-col pt-0">
        <Title
          title="Add Comic"
          description="Adding your Comic to Database"
          containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
        />

        <FormAddEditComic
          userId={session.user.id}
          statusData={STATUS}
          genreData={GENRE}
        />
      </Container>
    </div>
  );
}
