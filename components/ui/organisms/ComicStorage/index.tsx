"use client";

import React from "react";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";
import Title from "../../atoms/Title";
import OutlineInput from "../../molecules/OutlineInput";
import { ComicType } from "@/util/validations";
import Table from "../../molecules/Table";
import { ColumnDef } from "@tanstack/react-table";
import useFetch from "@/hooks/useFetch";

import { DateTime } from "luxon";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useInput } from "@/hooks";

export interface ComicStorageProps {
  userId: string;
}

export default function ComicStorage({ userId }: ComicStorageProps) {
  const router = useRouter();

  const {
    data: comics,
    setData: setComics,
    isLoading,
    setIsLoading,
  } = useFetch<ComicType>({
    url: `/api/comic/${userId}`,
  });

  const [filter, setFilter, onChangeFilterHandler] = useInput();

  const editHandler = React.useCallback(
    (value: unknown) => {
      router.push(`/dashboard/comic/edit/${value}`);
    },
    [router]
  );

  const deleteHandler = React.useCallback(
    async (value: unknown) => {
      await fetch(`/api/comic/delete/${value}`, {
        method: "DELETE",
      })
        .then(async (response) => {
          setIsLoading(true);
          const data = await response.json();
          setComics((prev) => prev.filter((c) => c._id !== data._id));
          toast.success("Delete item successfully");
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 500);
        });
    },
    [setComics, setIsLoading]
  );

  const comicColumns = React.useMemo<ColumnDef<ComicType>[]>(
    () => [
      {
        header: "No.",
        cell: (row) => row.row.index + 1,
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Status",
        cell: (row) => row.renderValue(),
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center",
        },
        accessorKey: "status",
      },
      {
        header: "Chapters",
        accessorFn: (row) => row.chapters?.length || 0,
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center",
        },
        accessorKey: "chapters",
      },
      {
        header: "Views",
        cell: (row) => row.renderValue(),
        meta: {
          thClassName: "text-center",
          tdClassName: "text-center",
        },
        accessorKey: "views",
      },
      {
        header: "Last Updated",
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
          tdClassName: "text-center",
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
              onClick={() => deleteHandler(row.getValue())}
              variant="text"
              className="rounded-full"
            >
              <XMarkIcon className="w-5 h-5" />
            </IconButton>
          </>
        ),
      },
    ],
    [editHandler, deleteHandler]
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
          <OutlineInput text="Search" onChange={onChangeFilterHandler} />
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

      {isLoading ? (
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
      )}
    </>
  );
}
