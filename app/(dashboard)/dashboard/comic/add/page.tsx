import AddComicForm from "@ui/templates/AddComicForm";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Add Comic",
  description: "Adding your Comic to Database",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <div className={`flex flex-col h-full`}>
      <AddComicForm userId={session.user.id} />
    </div>
  );
}
