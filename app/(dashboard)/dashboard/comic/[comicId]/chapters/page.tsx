import Chapters from "@/components/ui/organisms/Chapters";
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

  return (
    <div className="flex flex-col h-full">
      <Chapters cloudName={cloudName} comicId={comicId} />
    </div>
  );
}
