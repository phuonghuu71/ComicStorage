"use client";

import { BC_DASHBOARD_CHAPTERS_EDIT } from "@assets/breadcrumbs";

import BreadcrumbList from "../../molecules/BreadcrumbList";
import FormAddEditChapter from "../../organisms/FormAddEditChapter";
import { ComicType } from "@validators/Comic";
import { ChapterType } from "@validators/Chapter";
import { useFetchChapterById } from "@helpers/ClientFetch";

export interface EditChapterFormProps {
  comicData: ComicType;
  chapterId: string;
  cloudName: string;
}

export function EditChapterForm({
  comicData,
  chapterId,
  cloudName,
}: EditChapterFormProps) {
  const { data: chapterData } = useFetchChapterById<ChapterType>({ chapterId });

  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_CHAPTERS_EDIT(comicData.name, comicData._id)}
      />

      <FormAddEditChapter
        comicData={comicData}
        chapterData={chapterData}
        cloudName={cloudName}
        isEdit
      />
    </>
  );
}

export default EditChapterForm;
