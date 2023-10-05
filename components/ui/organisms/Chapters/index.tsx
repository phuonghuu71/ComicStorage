"use client";

import React from "react";

import { BC_DASHBOARD_CHAPTERS } from "@assets/breadcrumbs";

import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import DeleteModal from "../../atoms/DeleteModal";
import SkeletonTable from "../../atoms/SkeletonTable";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import OutlineInput from "../../molecules/OutlineInput";
import Table from "../../molecules/Table";
import Pagination from "../../molecules/Pagination";
import useFetchSingle from "@hooks/useFetchSingle";
import useInput from "@hooks/useInput";
import { ComicType } from "@validators/Comic";
import { ChapterType, TotalChapterType } from "@validators/Chapter";

import { Button, IconButton, Spinner } from "@material-tailwind/react";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface ChaptersProps {
  comicId: string;
}

export function Chapters({ comicId }: ChaptersProps) {
  const [filter, setFilter, onChangeFilterHandler] = useInput();
  const [reload, setReload] = React.useState<boolean>(false);
  const deleteId = React.useRef<unknown>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [currPage, setCurrPage] = React.useState<number>(1);
  const limit = 6;
  const router = useRouter();

  const { data } = useFetchSingle<ComicType>({
    url: `/api/comic/get-by-comic-id/${comicId}`,
  });

  const { data: fetchChapters, isLoading } = useFetchSingle<TotalChapterType>({
    url: `/api/chapter/${comicId}?page=${currPage}&limit=${limit}`,
    reload: reload,
  });

  const chapters = (fetchChapters?.chapters[0] || []) as ChapterType[];
  const numberOfPages = fetchChapters?.numberOfPages || (0 as number);

  const addChapterHandler = React.useCallback(() => {
    function addChapter() {
      router.push(`/dashboard/comic/${comicId}/chapters/add`);
    }

    addChapter();
  }, [router, comicId]);

  const editHandler = React.useCallback(
    (value: unknown) => {
      router.push(`/dashboard/comic/${comicId}/chapters/${value}/edit`);
    },
    [router, comicId]
  );

  const deleteHandler = React.useCallback(
    async (chapterId: unknown) => {
      try {
        await fetch(`/api/chapter/${comicId}/delete/${chapterId}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            toast.success("Delete item successfully");

            setTimeout(() => {
              setReload(true);
            }, 1);
          }
        });
      } catch (error) {
        toast.error(`Failed to delete chapter, Error: ${error}`);
      } finally {
        setReload(false);
      }
    },
    [comicId]
  );

  const chapterColumns = React.useMemo<ColumnDef<ChapterType>[]>(
    () => [
      {
        header: "No.",
        meta: {
          tdClassName: "whitespace-nowrap min-w-[50px]",
        },
        cell: (row) => row.row.index + limit * (currPage - 1) + 1,
      },
      {
        header: "Name",
        accessorKey: "chapter_name",
        meta: {
          tdClassName: "w-[99%]",
        },
        cell: (row) => row.renderValue(),
      },
      {
        header: "Actions",
        accessorFn: (row) => row._id,
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center whitespace-nowrap",
        },
        cell: (row) => (
          <>
            <IconButton
              onClick={() => editHandler(row.getValue())}
              variant="text"
              className="rounded-full"
            >
              <PencilIcon className="w-5 h-5" />
            </IconButton>
            <IconButton
              variant="text"
              onClick={() => {
                deleteId.current = row.getValue();
                setOpen(true);
              }}
              className="rounded-full z-10"
            >
              <XMarkIcon className="w-5" />
            </IconButton>
          </>
        ),
      },
    ],
    [currPage, editHandler]
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
            {/* <OutlineInput text="Search" onChange={onChangeFilterHandler} /> */}
            <Button
              onClick={addChapterHandler}
              className="flex items-center gap-x-2"
              size="sm"
            >
              <PlusIcon className="w-5 h-5" /> Add
            </Button>
          </div>
        </div>

        {isLoading ? (
          <SkeletonTable />
        ) : (
          <>
            <Table
              data={chapters}
              columns={chapterColumns}
              text={filter}
              setText={setFilter}
            />
            <Pagination
              limit={5}
              active={currPage}
              setActive={setCurrPage}
              pageCount={numberOfPages}
            />
          </>
        )}
      </Container>

      <DeleteModal
        open={open}
        setOpen={setOpen}
        onDeleteHandler={() => deleteHandler(deleteId.current)}
      />
    </>
  );
}

export default Chapters;
