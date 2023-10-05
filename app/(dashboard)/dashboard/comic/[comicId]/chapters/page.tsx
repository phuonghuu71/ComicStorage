import { Chapters } from "@ui/organisms";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type chapterParams = {
  comicId: string;
};

export default async function Page({ params }: { params: chapterParams }) {
  const session = await getServerSession();

  const { comicId } = params;

  if (!session) notFound();

  return (
    <div className="flex flex-col">
      <Chapters comicId={comicId} />
    </div>
  );
}
