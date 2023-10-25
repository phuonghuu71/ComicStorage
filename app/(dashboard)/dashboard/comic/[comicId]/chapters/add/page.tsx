import AddChapterForm from "@ui/templates/AddChapterForm";
import { ComicType } from "@validators/Comic";
import { getComicByComicId } from "@helpers/ServerFetch";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type chapterParams = {
  comicId: string;
};

export default async function Page({ params }: { params: chapterParams }) {
  const session = await getServerSession();

  const { comicId } = params;

  if (!session) notFound();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const localUrl = process.env.NEXTAUTH_URL;

  const comicData = await getComicByComicId<ComicType>(localUrl, comicId);

  return (
    <div className="flex flex-col h-full">
      <AddChapterForm cloudName={cloudName} comicData={comicData} />
    </div>
  );
}
