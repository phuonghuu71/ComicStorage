"use client";

import { BC_COMIC } from "@assets/breadcrumbs";
import GetParams from "@helpers/GetParams";
import BreadcrumbList from "@ui/molecules/BreadcrumbList";
import ComicDescription from "@ui/molecules/ComicDescription";

export function ComicDetails({ comicId }: { comicId: string }) {
  const name = GetParams("name");
  return (
    <>
      <BreadcrumbList data={BC_COMIC(name)} />

      <div className="flex gap-x-4 mb-4">
        <ComicDescription comicId={comicId} />
      </div>
    </>
  );
}

export default ComicDetails;
