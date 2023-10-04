"use client";

import { Spinner } from "@material-tailwind/react";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import { BC_DASHBOARD_CHAPTERS_EDIT } from "@/assets/constants/breadcrumbs";
import useFetchSingle from "@/hooks/useFetchSingle";
import { ComicType } from "@/util/validations";
import FormAddEditChapter from "../../organisms/FormAddEditChapter";

export interface EditChapterFormProps {
  comicId: string;
  chapterId: string;
  cloudName: string;
}

export default function EditChapterForm({
  comicId,
  chapterId,
  cloudName,
}: EditChapterFormProps) {
  const { data } = useFetchSingle<ComicType>({
    url: `/api/comic/get-by-comic-id/${comicId}`,
  });

  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_CHAPTERS_EDIT(
          data?.name || <Spinner className="w-3 h-3" />,
          comicId
        )}
      />

      <FormAddEditChapter
        comicId={comicId}
        chapterId={chapterId}
        comicName={data?.name}
        cloudName={cloudName}
        isEdit
      />
    </>
  );
}
