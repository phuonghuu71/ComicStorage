"use client";

import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import {
  SingleFileUploadWithProgress,
  Container,
  UploadableFile,
} from "@ui/atoms";
import { Typography } from "@material-tailwind/react";

export function MultipleFilesUpload({ cloudName }: { cloudName: string }) {
  const [files, setFiles] = React.useState<UploadableFile[]>([]);
  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAcceptedFiles = acceptedFiles.map((file) => ({
        file,
        errors: [],
      }));

      setFiles((prev) => [...prev, ...mappedAcceptedFiles, ...rejectedFiles]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  function onDeleteHandler(file: File) {
    setFiles((prev) => prev.filter((fw) => fw.file !== file));
  }

  function onUploadHandler(file: File, url: string) {
    setFiles((prev) =>
      prev.map((fw) => {
        if (fw.file === file) return { ...fw, url };
        return fw;
      })
    );
  }

  function onDragHandler(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  return (
    <div className="max-w-md col-span-4 flex flex-col">
      <div
        {...getRootProps()}
        className="top-[75px] sticky z-10 bg-white border p-4 border-dashed border-blue-gray-100 rounded-md mb-2 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-all min-h-[100px] last:mb-0"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography as={"p"} className="text-gray-500 font-sans">
            Drop the files here ...
          </Typography>
        ) : (
          <Typography
            as={"p"}
            className="text-gray-500 font-sans"
          >{`Drag 'n' drop some files here, or click to select files`}</Typography>
        )}
      </div>

      <Container
        maxHeight
        className="border-dashed rounded-md overflow-y-scroll border border-blue-gray-100 flex-1"
      >
        {files.map((fileWrapper, i) => (
          <SingleFileUploadWithProgress
            onDrag={onDragHandler}
            onDelete={onDeleteHandler}
            onUpload={onUploadHandler}
            cloudName={cloudName}
            key={i}
            fileWrapper={fileWrapper}
          />
        ))}
      </Container>
    </div>
  );
}

export default MultipleFilesUpload;
