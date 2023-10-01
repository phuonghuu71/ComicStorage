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
  url: string;
}

export default function ImageModal({ open, handleOpen, url }: ImageModalProps) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Its a simple dialog.</DialogHeader>
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
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
