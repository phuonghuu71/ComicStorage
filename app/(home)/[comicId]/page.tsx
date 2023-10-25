import ComicDetails from "@ui/templates/ComicDetails";
import { ChapterType } from "@validators/Chapter";
import { ComicType } from "@validators/Comic";
import { getChaptersByComicId, getComicByComicId } from "@helpers/ServerFetch";

async function updateView(comicId: string) {
  await fetch(`http://localhost:3000/api/comic/update-view/${comicId}`, {
    method: "PATCH",
  });
}

export async function generateMetadata({
  params,
}: {
  params: {
    comicId: string;
  };
}) {
  const { comicId } = params;

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);

  return {
    title: comicData.name,
    description: comicData.description,
  };
}

export default async function Page({
  params,
}: {
  params: {
    comicId: string;
  };
}) {
  const { comicId } = params;

  const url = process.env.URL;

  const comicData = await getComicByComicId<ComicType>(url, comicId);

  const chaptersData = await getChaptersByComicId<ChapterType[]>(url, comicId);

  const [comic, chapter] = await Promise.all([comicData, chaptersData]);

  await updateView(comicId);

  return <ComicDetails comicData={comic} chapterData={chapter} />;
}
