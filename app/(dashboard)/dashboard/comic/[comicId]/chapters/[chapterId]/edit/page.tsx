import { EditChapterForm } from "@ui/templates";

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

  return (
    <div className="flex flex-col h-full">
      <EditChapterForm
        cloudName={cloudName}
        chapterId={chapterId}
        comicId={comicId}
      />
    </div>
  );
}
