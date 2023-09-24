"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import Title from "../../atoms/Title";
import OutlineInput from "../../molecules/OutlineInput";
import { useRouter } from "next/navigation";
import React from "react";
import { ComicType } from "@/util/validations";
import Table from "../../molecules/Table";
import { Column } from "@tanstack/react-table";

export interface ComicStorageProps {
  userId: string;
}

export default function ComicStorage({ userId }: ComicStorageProps) {
  const router = useRouter();
  const [comics, setComics] = React.useState<ComicType[]>([]);

  const comicColumns: ComicType[] = [{}];

  React.useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch(`/api/comic/${userId}`);
        const data: ComicType[] = await response.json();
        setComics(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) fetchComics();
  }, [userId]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Title
          title="Storage"
          description="
              Storing the comics you want to manage"
          containerClass="self-start mb-4"
        />

        <div className="flex gap-x-2 items-center">
          <OutlineInput text="Search" />
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

      <Table data={comics} columns={comicColumns} />
    </>
  );
}
