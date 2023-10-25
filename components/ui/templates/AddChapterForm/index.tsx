"use client";

import { BC_DASHBOARD_CHAPTERS_ADD } from "@assets/breadcrumbs";

import BreadcrumbList from "../../molecules/BreadcrumbList";
import FormAddEditChapter from "../../organisms/FormAddEditChapter";
import { ComicType } from "@validators/Comic";

import { Spinner } from "@material-tailwind/react";

export interface AddChapterFormProps {
  comicData: ComicType;
  cloudName: string;
}

export function AddChapterForm({ comicData, cloudName }: AddChapterFormProps) {
  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_CHAPTERS_ADD(
          comicData.name || <Spinner className="w-3 h-3" />,
          comicData._id
        )}
      />

      <FormAddEditChapter comicData={comicData} cloudName={cloudName} />
    </>
  );
}

export default AddChapterForm;
