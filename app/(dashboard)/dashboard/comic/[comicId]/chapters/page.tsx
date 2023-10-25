import { getComicByComicId } from "@helpers/ServerFetch";
import Chapters from "@ui/organisms/Chapters";
import { ComicType } from "@validators/Comic";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type chapterParams = {
  comicId: string;
};

export default async function Page({ params }: { params: chapterParams }) {
  const session = await getServerSession();

  const { comicId } = params;

  if (!session) notFound();

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);

  return (
    <div className="flex flex-col">
      <Chapters comicData={comicData} />
    </div>
  );
}
