"use client";

import BreadcrumbList from "../../molecules/BreadcrumbList";
import { BC_DASHBOARD_CHAPTERS } from "@/assets/constants/breadcrumbs";
import useFetchSingle from "@/hooks/useFetchSingle";
import { ChapterType, ComicType } from "@/util/validations";
import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import useDragDrop from "@/hooks/useDragDrop";
import FormAddEditChapter from "../FormAddEditChapter";
import { ColumnDef } from "@tanstack/react-table";
import Container from "../../atoms/Container";
import Table from "../../molecules/Table";
import OutlineInput from "../../molecules/OutlineInput";
import { PlusIcon } from "@heroicons/react/24/solid";
import Title from "../../atoms/Title";
import { useRouter } from "next/navigation";

export interface ChaptersProps {
  comicId: string;
  cloudName: string;
}

export default function Chapters({ comicId, cloudName }: ChaptersProps) {
  const router = useRouter();

  const data = useFetchSingle<ComicType>({
    url: `/api/comic/get-by-comic-id/${comicId}`,
  });

  const addChapterHandler = React.useCallback(() => {
    function addChapter() {
      router.push(`/dashboard/comic/${comicId}/chapters/add`);
    }

    addChapter();
  }, [router, comicId]);

  const chapterColumns = React.useMemo<ColumnDef<ChapterType>[]>(
    () => [
      {
        header: "No.",
        cell: (row) => row.row.index + 1,
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (row) => row.renderValue(),
      },
    ],
    []
  );

  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_CHAPTERS(
          data?.name || <Spinner className="w-3 h-3" />
        )}
      />

      <Container className="flex-1 w-full overflow-y-scroll flex flex-col pt-0">
        <div className="flex items-center justify-between w-full">
          <Title
            title="Chapters"
            description={`This place contains chapters of ${
              data?.name ? `${data?.name}` : "..."
            }`}
            containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
          />

          <div className="flex gap-x-2 items-center">
            <OutlineInput text="Search" />
            <Button
              onClick={addChapterHandler}
              className="flex items-center gap-x-2"
              size="sm"
            >
              <PlusIcon className="w-5 h-5" /> Add
            </Button>
          </div>
        </div>

        {/* {isLoading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Table
          data={comics}
          columns={comicColumns}
          text={filter}
          setText={setFilter}
        />
      )} */}
      </Container>
    </>
  );
}
