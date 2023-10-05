"use client";

import React from "react";

import { IconButton, Typography } from "@material-tailwind/react";
import { UploadableFile } from "../../atoms/SingleFileUploadWithProgress";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

export function ChapterItem({
  chapterIdx,
  chapter,
  onDragStartHandler,
  onDragEndHandler,
  onDragEnterHandler,
  onDragOverHandler,
  onDeleteHandler,
}: ChapterItemProps) {
  const getUrl = chapter.url ? JSON.parse(JSON.stringify(chapter.url)) : "";

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
        <Typography as={"p"} color="gray" className="line-clamp-1">{`Name: ${
          getUrl.original_filename || getUrl.secure_url.split("/").pop()
        }`}</Typography>
      </div>
      <IconButton onClick={handleOpen} variant="text" className="shrink-0">
        <EyeIcon className="w-5 h-5" />
      </IconButton>

      <ImageModal open={open} handleOpen={handleOpen} url={getUrl.secure_url} />

      <IconButton
        variant="text"
        className="shrink-0"
        onClick={() => onDeleteHandler(chapterIdx)}
      >
        <XMarkIcon className="w-5 h-5" />
      </IconButton>
    </div>
  );
}

export default ChapterItem;
