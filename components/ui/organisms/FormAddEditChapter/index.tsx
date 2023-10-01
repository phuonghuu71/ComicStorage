"use client";

import React from "react";
import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import MultipleFilesUpload from "../../molecules/MultipleFilesUpload";
import OutlineInput from "../../molecules/OutlineInput";
import { Button, Typography } from "@material-tailwind/react";
import ChapterItem, { urlType } from "../../molecules/ChapterItem";
import { UseDragDropProps, useInput } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { ChapterType, chapterValidator } from "@/util/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import StaticInput from "../../molecules/StaticInput";
import AddPages from "../AddPages";

export interface FormAddEditChapterProps extends UseDragDropProps {
  cloudName: string;
  comicName?: string;
}

export interface PageProps {
  page_number: number;
  page_img_url: string;
}

export default function FormAddEditChapter({
  cloudName,
  comicName,
  ...widgetsProps
}: FormAddEditChapterProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChapterType>({
    defaultValues: {
      name: "",
      pages: [],
    },
    resolver: zodResolver(chapterValidator),
  });

  const onSubmit = async (data: ChapterType) => {
    console.log(data);
  };

  return (
    <Container
      maxHeight
      className="flex-1 w-full h-full overflow-y-scroll flex flex-col pt-0"
    >
      <Title
        title="Add Chapter"
        description={`Please add a chapter for ${
          comicName ? `${comicName}` : "..."
        }`}
        containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
      />

      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <StaticInput
          name="name"
          isRequired
          register={register}
          errors={errors}
          label="Chapter name"
          placeholder="Chapter Name"
          containerClassName={`mb-6`}
          showTooltip
          tooltipContent="The Name of Chapter you want to display"
          type="text"
        />

        <Controller
          name="pages"
          control={control}
          render={({ field: { onChange, name } }) => (
            <AddPages
              name={name}
              onChange={onChange}
              cloudName={cloudName}
              errors={errors}
              {...widgetsProps}
            />
          )}
        />

        <Button type="submit" className="w-fit self-end">
          Add
        </Button>
      </form>
    </Container>
  );
}
