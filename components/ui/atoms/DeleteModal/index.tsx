"use client";

import React from "react";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

export interface DeleteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteHandler: () => void;
}

export function DeleteModal({
  open,
  setOpen,
  onDeleteHandler,
}: DeleteModalProps) {
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog handler={handleOpen} open={open} size="xs">
      <DialogHeader className="flex justify-center pb-0">
        <ExclamationCircleIcon className="w-20 h-20 text-red-500" />
      </DialogHeader>
      <DialogBody>
        <Typography
          as={"h2"}
          className="text-center text-2xl font-semibold mb-2"
        >
          Are you sure?
        </Typography>

        <Typography as={"p"} className="text-center">
          Do you want to delete this record? This process cannot be undone.
        </Typography>
      </DialogBody>
      <DialogFooter className="justify-center">
        <Button onClick={handleOpen} className="mr-2" color="blue-gray">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDeleteHandler();
            setOpen(false);
          }}
          color="red"
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DeleteModal;
