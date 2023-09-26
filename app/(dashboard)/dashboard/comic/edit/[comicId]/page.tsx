import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EditComicForm from "@/components/ui/templates/EditComicForm";

export const metadata: Metadata = {
  title: "Edit Comic",
  description: "Edit your existed Comic",
};

type comicParams = {
  comicId: string;
};

export default async function Page({ params }: { params: comicParams }) {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <div className={`flex flex-col h-full`}>
      <EditComicForm comicId={params.comicId} userId={session.user.id} />
    </div>
  );
}
