"use client";

import React from "react";
import { Button, Spinner } from "@material-tailwind/react";
import StaticInput from "../../molecules/StaticInput";
import AddChip from "../../molecules/AddChip";
import { useChip } from "@hooks";
import StaticSelect from "../../molecules/StaticSelect";
import UploadInput from "../../atoms/UploadInput";
import RichTextEditor from "../../atoms/RichTextEditor";
import { ComicType, comicValidator } from "@validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

/* eslint-disable-next-line */
export interface FormAddEditComicProps {
  statusData: string[];
  genreData: string[];
  userId: string;
}

export default function FormAddEditComic({
  statusData,
  genreData,
  userId,
}: FormAddEditComicProps) {
  const chipProps = useChip(genreData);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComicType>({
    defaultValues: {
      uploader: userId,
      name: "",
      tags: [],
      status: statusData[0],
      cover: "",
      description: "",
      views: 0,
      last_update: new Date(),
    },
    resolver: zodResolver(comicValidator),
  });

  const onSubmit = async (data: ComicType) => {
    setIsLoading(true);

    const validatedData = comicValidator.parse(data);

    await fetch("/api/comic/add", {
      method: "POST",
      body: JSON.stringify(validatedData),
    })
      .then((response) => {
        if (response.status === 409) {
          setError("name", {
            message: response.statusText,
          });
          return;
        }
        return response;
      })
      .then((response) => {
        if (response && response.ok) {
          toast.success("Successfully create new comic.");

          reset();
        }
      })
      .catch((error) => {
        toast.error(`Failed to create new comic, Error: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 px-2 flex flex-col"
    >
      <StaticInput
        name="name"
        isRequired
        register={register}
        errors={errors}
        label="Name"
        placeholder="Comic Name"
        containerClassName="mb-6"
        showTooltip
        tooltipContent="The Name of Comic you want to display"
        type="text"
      />

      <Controller
        name="tags"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <AddChip
            containerClassname="relative mb-6"
            label="Tag"
            placeholder="Your tags"
            showTooltip
            tooltipContent="The tags you want to display, this information must be provided"
            name={name}
            value={value}
            errors={errors}
            onChange={onChange}
            {...chipProps}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange } }) => (
          <StaticSelect
            containerClassname="mb-8"
            list={statusData}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name="cover"
        control={control}
        render={({ field: { name, onChange } }) => (
          <UploadInput
            containerClassname="mb-4"
            label="Upload Cover"
            placeholder="Cover Filepath"
            name={name}
            errors={errors}
            onChange={(e) => {
              if (e.target.files) {
                const file = new FileReader();

                file.onloadend = () => {
                  if (file.result) onChange(file.result.toString());
                };

                file.readAsDataURL(e.target.files[0]);
              }
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { name, onChange } }) => (
          <RichTextEditor
            name={name}
            errors={errors}
            title="Description"
            id="Editor"
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            onEditorChange={onChange}
            containerClassname="mb-4 flex-1"
            init={{
              resize: false,
              menubar: false,
              plugins: ["lists"],
              height: 215,
            }}
          />
        )}
      />

      <Button type="submit" className="ml-auto">
        {isLoading ? <Spinner className="w-4 h-4" /> : "Post"}
      </Button>
    </form>
  );
}
