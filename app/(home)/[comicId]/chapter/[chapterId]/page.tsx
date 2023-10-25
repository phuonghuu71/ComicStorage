import ChapterDetails from "@ui/templates/ChapterDetails";
import { ChapterType } from "@validators/Chapter";
import { ComicType } from "@validators/Comic";
import {
  getChapterByChapterId,
  getChaptersByComicId,
  getComicByComicId,
} from "@helpers/ServerFetch";

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

  const [comic, chapter, chapters] = await Promise.all([
    comicData,
    chapterData,
    chaptersData,
  ]);

  return (
    <ChapterDetails
      chaptersData={chapters}
      chapterData={chapter}
      comicData={comic}
    />
  );
}
