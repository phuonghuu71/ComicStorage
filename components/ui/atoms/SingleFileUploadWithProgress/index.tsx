"use client";

import React from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  IconButton,
  Progress,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { FileError } from "react-dropzone";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

export interface SingleFileUploadWithProgressProps {
  fileWrapper: UploadableFile;
  cloudName: string;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
  onDrag: (e: React.DragEvent, widgetType: string) => void;
}

function uploadFile(
  file: File,
  cloudName: string,
  onProgress: (percentage: number) => void
) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const key = cloudName;

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    };

    xhr.onerror = (e) => {
      reject(e);
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
}

export function SingleFileUploadWithProgress({
  fileWrapper,
  onDelete,
  onUpload,
  onDrag,
  cloudName,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = React.useState(0);
  const [previewImg, setPreviewImg] = React.useState("");

  React.useEffect(() => {
    if (fileWrapper.file) {
      setPreviewImg(URL.createObjectURL(fileWrapper.file));
    }
  }, [fileWrapper.file]);

  React.useEffect(() => {
    async function upload() {
      const url = await uploadFile(fileWrapper.file, cloudName, setProgress);
      onUpload(fileWrapper.file, url);
    }

    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex gap-x-2 rounded-md border border-dashed border-gray-100 w-full group hover:border-purple-500 transition-all max-h-28 overflow-hidden mb-2 last:mb-0 cursor-pointer"
      draggable
      onDragStart={(e) => onDrag(e, JSON.stringify(fileWrapper))}
    >
      <div className="max-w-[112px] w-full flex items-center justify-center">
        {previewImg !== "" ? (
          <Image
            src={previewImg}
            alt="preview_img"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        ) : (
          <Spinner className="w-5 h-5" />
        )}
      </div>
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <Typography as={"p"} className="font-medium max-w-[100px] truncate">
              {fileWrapper.file.name}
            </Typography>

            <Typography as={"p"} className="font-thin text-gray-500">
              {(fileWrapper.file.size / (1024 * 1024)).toFixed(2)} MB
            </Typography>
          </div>
          <IconButton
            variant="text"
            color="gray"
            onClick={() => onDelete(fileWrapper.file)}
          >
            <XMarkIcon className="text-gray-500 w-5 h-5" />
          </IconButton>
        </div>
        <div className="flex items-center justify-between mb-2">
          <Typography as={"p"} className="font-thin text-gray-500">
            {fileWrapper.file.type}
          </Typography>
          <Typography as={"p"} className="font-thin text-gray-500">
            {progress}%
          </Typography>
        </div>
        <Progress value={progress} color="purple" />
      </div>
    </div>
  );
}

export default SingleFileUploadWithProgress;
