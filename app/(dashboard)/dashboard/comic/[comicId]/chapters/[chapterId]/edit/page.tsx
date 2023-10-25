import EditChapterForm from "@ui/templates/EditChapterForm";
import { ComicType } from "@validators/Comic";
import { getComicByComicId } from "@helpers/ServerFetch";

import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type chapterParams = {
  comicId: string;
  chapterId: string;
};

export default async function Page({ params }: { params: chapterParams }) {
  const session = await getServerSession();

  const { comicId, chapterId } = params;

  if (!session) notFound();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);

  return (
    <div className="flex flex-col h-full">
      <EditChapterForm
        cloudName={cloudName}
        comicData={comicData}
        chapterId={chapterId}
      />
    </div>
  );
}
