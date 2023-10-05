"use client";

import { BC_DASHBOARD_CHAPTERS_ADD } from "@assets/breadcrumbs";

import BreadcrumbList from "../../molecules/BreadcrumbList";
import FormAddEditChapter from "../../organisms/FormAddEditChapter";
import { ComicType } from "@validators/Comic";
import useFetchSingle from "@hooks/useFetchSingle";

import { Spinner } from "@material-tailwind/react";

export interface AddChapterFormProps {
  comicId: string;
  cloudName: string;
}

export function AddChapterForm({ comicId, cloudName }: AddChapterFormProps) {
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

export default AddChapterForm;
