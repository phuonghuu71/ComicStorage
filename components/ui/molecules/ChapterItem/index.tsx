"use client";

import React from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { UploadableFile } from "../MultipleFilesUpload";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ImageModal from "../ImageModal";

export interface ChapterItemProps {
  chapterIdx: number;
  chapter: UploadableFile;
  onDragStartHandler: (idx: number) => void;
  onDragEnterHandler: (idx: number) => void;
  onDragEndHandler: () => void;
  onDragOverHandler: (e: React.DragEvent) => void;
  onDeleteHandler: (idx: number) => void;
}

export type urlType = {
  url: string;
  secure_url: string;
  original_filename: string;
};

export default function ChapterItem({
  chapterIdx,
  chapter,
  onDragStartHandler,
  onDragEndHandler,
  onDragEnterHandler,
  onDragOverHandler,
  onDeleteHandler,
}: ChapterItemProps) {
  const getUrl = (
    chapter.url ? JSON.parse(JSON.stringify(chapter.url)) : ""
  ) as urlType;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div
      draggable
      onDragStart={() => onDragStartHandler(chapterIdx)}
      onDragEnter={() => onDragEnterHandler(chapterIdx)}
      onDragEnd={onDragEndHandler}
      onDragOver={(e) => onDragOverHandler(e)}
      className="w-full border border-blue-gray-50 p-2 rounded-md mb-2 last:mb-0 flex justify-between items-start gap-x-2"
    >
      <div className="mr-auto">
        <Typography as={"h6"}>{`Page ${chapterIdx + 1}`}</Typography>
        <Typography
          as={"p"}
          color="gray"
        >{`Name: ${getUrl.original_filename}`}</Typography>
      </div>
      <IconButton onClick={handleOpen} variant="text">
        <EyeIcon className="w-5 h-5" />
      </IconButton>

      <ImageModal open={open} handleOpen={handleOpen} url={getUrl.secure_url} />

      <IconButton variant="text" onClick={() => onDeleteHandler(chapterIdx)}>
        <XMarkIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
}
