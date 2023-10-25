"use client";

import React from "react";

import { BC_COMIC } from "@assets/breadcrumbs";
import BreadcrumbList from "@ui/molecules/BreadcrumbList";
import ComicDescription from "@ui/molecules/ComicDescription";
import { ComicType } from "@validators/Comic";
import SkeletonComic from "@ui/atoms/SkeletonComic";
import { Typography } from "@material-tailwind/react";
import { ChapterType } from "@validators/Chapter";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ComicDetails({
  comicData,
  chapterData,
}: {
  comicData: ComicType;
  chapterData: ChapterType[];
}) {
  const router = useRouter();

  const uploader = React.useMemo<User>(() => {
    const uploader = JSON.stringify(comicData.uploader);
    const parsedUploader = JSON.parse(uploader) as User;
    return parsedUploader;
  }, [comicData.uploader]);

  return (
    <>
      <BreadcrumbList data={BC_COMIC(comicData.name)} />

      <div className="flex gap-x-4 mb-4">
        {!comicData || !uploader || !chapterData ? (
          <div className="bg-white max-w-md w-full p-4 rounded-xl">
            <SkeletonComic />
          </div>
        ) : (
          <>
            <ComicDescription comicData={comicData} uploader={uploader} />

            <div className="bg-white w-full p-4 rounded-xl shadow-md h-fit max-h-96">
              <Typography
                as={"h2"}
                variant="h2"
                className="text-purple-500 text-lg mb-4"
              >
                Chapters
              </Typography>

              <div className="p-4 w-full border border-blue-gray-50 rounded-xl cursor-pointer  font-medium">
                {chapterData.map((chapter) => (
                  <Link
                    key={chapter._id}
                    href={{
                      pathname: `${comicData._id}/chapter/${chapter._id}`,
                    }}
                  >
                    <Typography as={"p"} className="hover:text-purple-500">
                      {chapter.chapter_name}
                    </Typography>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ComicDetails;
