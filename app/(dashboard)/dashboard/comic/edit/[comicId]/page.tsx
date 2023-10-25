import EditComicForm from "@ui/templates/EditComicForm";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { authOptions } from "../../../../../api/auth/[...nextauth]/route";

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

  const { comicId } = params;

  return (
    <div className={`flex flex-col h-full`}>
      <EditComicForm comicId={comicId} userId={session.user.id} />
    </div>
  );
}
