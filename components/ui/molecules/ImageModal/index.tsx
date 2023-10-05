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

export function ImageModal({ open, handleOpen, url }: ImageModalProps) {
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
        <Image
          src={url}
          alt="Preview_page"
          className="w-full h-fit object-center object-contain"
          width={100}
          height={100}
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

export default ImageModal;
