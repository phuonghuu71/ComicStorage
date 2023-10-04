"use client";

import { Spinner } from "@material-tailwind/react";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import { BC_DASHBOARD_CHAPTERS_ADD } from "@/assets/constants/breadcrumbs";
import useFetchSingle from "@/hooks/useFetchSingle";
import { ComicType } from "@/util/validations";
import FormAddEditChapter from "../../organisms/FormAddEditChapter";

export interface AddChapterFormProps {
  comicId: string;
  cloudName: string;
}

export default function AddChapterForm({
  comicId,
  cloudName,
}: AddChapterFormProps) {
  const { data } = useFetchSingle<ComicType>({
    url: `/api/comic/get-by-comic-id/${comicId}`,
  });

  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_CHAPTERS_ADD(
          data?.name || <Spinner className="w-3 h-3" />,
          comicId
        )}
      />

      <FormAddEditChapter
        comicId={comicId}
        comicName={data?.name}
        cloudName={cloudName}
      />
    </>
  );
}