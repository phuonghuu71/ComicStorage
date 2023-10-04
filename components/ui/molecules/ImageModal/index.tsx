"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Image from "next/image";

export interface ImageModalProps {
  open: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<any>>;
  url: any;
}

export default function ImageModal({ open, handleOpen, url }: ImageModalProps) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>
        <span className="line-clamp-1">
          {url.original_filename || url.split("/").pop()}
        </span>
      </DialogHeader>
      <DialogBody
        divider
        className="flex justify-center items-center max-h-[500px] overflow-y-scroll p-0"
      >
        <img
          src={url}
          alt="Preview_page"
          className="w-full h-fit object-center object-contain"
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="purple" onClick={handleOpen}>
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
