"use client";

import { BC_CHAPTER } from "@assets/breadcrumbs";
import { Button, Option, Select } from "@material-tailwind/react";
import BreadcrumbList from "@ui/molecules/BreadcrumbList";
import { ChapterType } from "@validators/Chapter";
import { ComicType } from "@validators/Comic";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ChapterDetails({
  comicData,
  chapterData,
  chaptersData,
}: {
  comicData: ComicType;
  chapterData: ChapterType;
  chaptersData: ChapterType[];
}) {
  const router = useRouter();
  const [activeChapter, setActiveChapter] = React.useState<string | undefined>(
    chaptersData.find((chapter) => chapter._id === chapterData._id)?._id
  );

  React.useEffect(() => {
    if (activeChapter !== chapterData._id) router.replace(`${activeChapter}`);
  }, [activeChapter, chapterData, router]);

  const handlePrev = (chapterId: string) => {
    const findPrevIndex =
      chaptersData.findIndex((chapter) => chapter._id === chapterId) - 1;
    setActiveChapter(chaptersData[findPrevIndex]._id);
  };

  const handleNext = (chapterId: string) => {
    const findPrevIndex =
      chaptersData.findIndex((chapter) => chapter._id === chapterId) + 1;
    setActiveChapter(chaptersData[findPrevIndex]._id);
  };

  return (
    <>
      <BreadcrumbList
        data={BC_CHAPTER(
          comicData.name,
          `/${comicData._id}`,
          chapterData.chapter_name
        )}
      />

      <div className="flex mb-4 gap-x-4">
        <Button
          disabled={chaptersData[0]._id === chapterData._id}
          onClick={() => handlePrev(activeChapter || "")}
          className="w-28"
        >
          PREV
        </Button>

        <Select
          variant={"outlined"}
          label="Chapters"
          value={activeChapter}
          onChange={(chapter) => setActiveChapter(chapter)}
        >
          {chaptersData.map((item) => (
            <Option key={item._id} value={item._id} className="mb-2 last:mb-0">
              {item.chapter_name}
            </Option>
          ))}
        </Select>

        <Button
          disabled={
            chaptersData[chaptersData.length - 1]._id === chapterData._id
          }
          onClick={() => handleNext(activeChapter || "")}
          className="w-28"
        >
          NEXT
        </Button>
      </div>

      <div className="mb-4 flex flex-col items-center">
        {chapterData?.pages.map((page) => (
          <div
            key={page.page_number}
            className="mb-2 last:mb-0 border-2 border-purple-500"
          >
            <Image
              src={page.page_img_url}
              alt="page"
              width={9999}
              height={9999}
              className="w-full h-full"
              priority
            />
          </div>
        ))}
      </div>
    </>
  );
}
