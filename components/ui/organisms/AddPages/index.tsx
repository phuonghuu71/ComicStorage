"use client";

import React from "react";

import HelperText from "../../atoms/HelperText";
import Container from "../../atoms/Container";
import ChapterItem, { urlType } from "../../molecules/ChapterItem";
import MultipleFilesUpload from "../../molecules/MultipleFilesUpload";
import { UseDragDropProps } from "@hooks/useDragDrop";

import { Typography } from "@material-tailwind/react";
import { FieldErrors } from "react-hook-form";

export interface AddPages extends UseDragDropProps {
  cloudName: string;
  errors: FieldErrors<any>;
  name: string;
  onChange: (...event: any[]) => void;
}

export function AddPages({
  name,
  cloudName,
  errors,
  onChange,
  widgets,
  onDropHandler,
  onDragOverHandler,
  onDragStartHandler,
  onDragEnterHandler,
  onDragEndHandler,
  onDeleteHandler,
}: AddPages) {
  React.useEffect(() => {
    const pages = [...widgets];

    if (widgets) {
      const updatedPages = pages.map((page, i) => {
        const page_url = JSON.parse(JSON.stringify(page.url)) as urlType;

        return {
          page_number: i,
          page_img_url: page_url.secure_url,
        };
      });

      onChange(updatedPages);
    }
  }, [onChange, widgets]);

  return (
    <>
      <div className="grid grid-cols-10 gap-x-2 flex-1 h-full mb-2">
        <MultipleFilesUpload cloudName={cloudName} />

        <div className="col-span-6 gap-y-2 flex flex-col">
          <div
            onDrop={onDropHandler}
            onDragOver={onDragOverHandler}
            className="w-full min-h-[100px] top-[75px] sticky z-10 overflow-y-scroll border rounded-md border-dashed border-blue-gray-100 p-2 flex justify-center items-center"
          >
            <Typography as={"p"} className="text-gray-500 font-sans">
              Drop the files here to sort
            </Typography>
          </div>

          <Container
            maxHeight
            className="flex-1 border-blue-gray-100 rounded-md border border-dashed overflow-y-scroll"
          >
            {widgets.length !== 0 ? (
              widgets.map((widget, i) => {
                return (
                  <ChapterItem
                    chapter={widget}
                    onDeleteHandler={() => onDeleteHandler(i)}
                    onDragEndHandler={onDragEndHandler}
                    onDragEnterHandler={onDragEnterHandler}
                    onDragStartHandler={onDragStartHandler}
                    onDragOverHandler={onDragOverHandler}
                    chapterIdx={i}
                    key={i}
                  />
                );
              })
            ) : (
              <>
                <div className="w-full h-10 bg-blue-gray-100 animate-pulse rounded mb-2 last:mb-0" />
                <div className="w-full h-10 bg-blue-gray-100 animate-pulse rounded mb-2 last:mb-0" />
                <div className="w-full h-10 bg-blue-gray-100 animate-pulse rounded mb-2 last:mb-0" />
              </>
            )}
          </Container>
        </div>
      </div>

      {errors[name] && (
        <HelperText isError text={errors[name]?.message?.toString()} />
      )}
    </>
  );
}

export default AddPages;
