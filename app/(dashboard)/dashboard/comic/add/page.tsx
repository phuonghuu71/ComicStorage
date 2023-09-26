import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AddComicForm from "@/components/ui/templates/AddComicForm";

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
