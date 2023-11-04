import ChapterDetails from "@ui/templates/ChapterDetails";
import { ChapterType } from "@validators/Chapter";
import { ComicType } from "@validators/Comic";
import {
  getChapterByChapterId,
  getChaptersByComicId,
  getComicByComicId,
} from "@helpers/ServerFetch";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { TotalCommentsType } from "@validators/Comment";

export async function generateMetadata({
  params,
}: {
  params: {
    comicId: string;
    chapterId: string;
  };
}) {
  const { comicId, chapterId } = params;

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);
  const chapterData = await getChapterByChapterId<ChapterType>(url, chapterId);

  return {
    title: `${chapterData.chapter_name} - ${comicData.name}`,
    description: comicData.description,
  };
}

async function getCommentsByChapterId<CommentType>(
  url: string,
  chapterId: string
) {
  const res = await fetch(`${url}/api/comment/chapter/${chapterId}`, {
    cache: "no-store",
  });

  return res.json() as CommentType;
}

export default async function Page({
  params,
}: {
  params: {
    comicId: string;
    chapterId: string;
  };
}) {
  const { comicId, chapterId } = params;

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);
  const chapterData = await getChapterByChapterId<ChapterType>(url, chapterId);
  const chaptersData = await getChaptersByComicId<ChapterType[]>(url, comicId);
  const commentData = await getCommentsByChapterId<TotalCommentsType>(
    url,
    chapterId
  );

  const [comic, chapter, chapters] = await Promise.all([
    comicData,
    chapterData,
    chaptersData,
  ]);

  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <ChapterDetails
      chaptersData={chapters}
      chapterData={chapter}
      commentData={commentData}
      comicData={comic}
      userId={session.user.id}
    />
  );
}
