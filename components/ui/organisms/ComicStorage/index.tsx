"use client";

import React from "react";

import { PencilIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { IconButton, Button } from "@material-tailwind/react";

import Title from "../../atoms/Title";
import SkeletonTable from "../../atoms/SkeletonTable";
import DeleteModal from "../../atoms/DeleteModal";
import OutlineInput from "../../molecules/OutlineInput";
import Table from "../../molecules/Table";
import Pagination from "../../molecules/Pagination";
import useInput from "@hooks/useInput";
import { useFetchComicsById } from "@helpers/ClientFetch";
import { ComicType, TotalComicType } from "@validators/Comic";

import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";

export interface ComicStorageProps {
  userId: string;
}

export function ComicStorage({ userId }: ComicStorageProps) {
  const router = useRouter();
  const limit = 5;
  const [currPage, setCurrPage] = React.useState<number>(1);
  const [open, setOpen] = React.useState<boolean>(false);
  const [filter, setFilter, onChangeFilterHandler] = useInput();
  const [comic, setComic] = React.useState<ComicType>();
  const deleteId = React.useRef<unknown>();

  const {
    data: fetchComics,
    error: errorComics,
    isLoading: isLoadingComics,
    mutate,
  } = useFetchComicsById<TotalComicType>({
    userId: userId,
    page: currPage,
    limit: limit,
  });

  const numberOfPages = (fetchComics?.numberOfPages || 0) as number;

  const editHandler = React.useCallback(
    (value: unknown) => {
      router.push(`/dashboard/comic/edit/${value}`);
    },
    [router]
  );

  const deleteHandler = React.useCallback(
    async (value: unknown) => {
      try {
        await fetch(`/api/comic/delete/${value}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            toast.success("Delete item successfully");
          }
        });
      } catch (error) {
        toast.error(`Failed to delete comic, Error: ${error}`);
      } finally {
        mutate();
      }
    },
    [mutate]
  );

  React.useEffect(() => {
    if (comic) router.push(`/dashboard/comic/${comic._id}/chapters`);
  }, [comic, router]);

  const comicColumns = React.useMemo<ColumnDef<ComicType>[]>(
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
        meta: {
          tdClassName: "w-[99%]",
        },
        cell: (row) => {
          return (
            <p
              onClick={() => {
                setComic(row.row.original);
              }}
            >
              {row.getValue() as React.ReactNode}
            </p>
          );
        },
        accessorKey: "name",
      },
      {
        header: "Status",
        cell: (row) => row.renderValue(),
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center whitespace-nowrap",
        },
        accessorKey: "status",
      },
      {
        header: "Chapters",
        accessorFn: (row) => row.chapters?.length || 0,
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center min-w-[100px]",
        },
        accessorKey: "chapters",
      },
      {
        header: "Views",
        cell: (row) => row.renderValue(),
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center min-w-[100px]",
        },
        accessorKey: "views",
      },
      {
        header: "Last Updated",
        meta: {
          tdClassName: "whitespace-nowrap min-w-[200px]",
        },
        accessorFn: (row) =>
          DateTime.fromISO(row.last_update.toString()).toLocaleString(
            DateTime.DATETIME_SHORT
          ),
        accessorKey: "last_update",
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
              onClick={() => {
                deleteId.current = row.getValue();
                setOpen(true);
              }}
              variant="text"
              className="rounded-full z-10"
            >
              <XMarkIcon className="w-5" />
            </IconButton>
          </>
        ),
      },
    ],
    [editHandler, currPage]
  );

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Title
          title="Storage"
          description="
              Storing the comics you want to manage"
          containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
        />

        <div className="flex gap-x-2 items-center">
          {/* <OutlineInput text="Search" onChange={onChangeFilterHandler} /> */}
          <Button
            onClick={() => {
              router.push("/dashboard/comic/add");
            }}
            className="flex items-center gap-x-2"
            size="sm"
          >
            <PlusIcon className="w-5 h-5" /> Add
          </Button>
        </div>
      </div>

      {!fetchComics ? (
        <SkeletonTable />
      ) : (
        <>
          <Table
            data={fetchComics.comics}
            columns={comicColumns}
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

      <DeleteModal
        onDeleteHandler={() => deleteHandler(deleteId.current)}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default ComicStorage;
