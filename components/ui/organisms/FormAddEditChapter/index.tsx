"use client";

import React from "react";

import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import StaticInput from "../../molecules/StaticInput";
import AddPages from "../AddPages";
import useFetchSingle from "@hooks/useFetchSingle";
import useDragDrop from "@hooks/useDragDrop";
import { ChapterType, chapterValidator } from "@validators/Chapter";

import toast from "react-hot-toast";
import { Button, Spinner } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export interface FormAddEditChapterProps {
  cloudName: string;
  comicName?: string;
  comicId?: string;
  chapterId?: string;
  isEdit?: boolean;
}

export interface PageProps {
  page_number: number;
  page_img_url: string;
}

export function FormAddEditChapter({
  cloudName,
  comicName,
  comicId,
  chapterId,
  isEdit,
}: FormAddEditChapterProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<ChapterType>({
    defaultValues: {
      chapter_name: "",
      pages: [],
    },
    resolver: zodResolver(chapterValidator),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [chapterData, setChapterData] = React.useState<ChapterType>();

  React.useEffect(() => {
    async function fetchChapter() {
      const fetchChapterData = await fetch(
        `/api/chapter/get-chapter-by-id/${chapterId}`
      );

      const parsedChapterData = await fetchChapterData.json();
      setChapterData(parsedChapterData as ChapterType);
    }

    if (isEdit && chapterId) fetchChapter();
  }, [isEdit, chapterId]);

  const widgetsProps = useDragDrop({
    chapterData: chapterData,
  });

  React.useEffect(() => {
    const fetchChapter = () => {
      if (chapterData) {
        reset({
          chapter_name: chapterData.chapter_name,
          pages: [...chapterData.pages],
        });
      }
    };
    if (chapterData && isEdit) fetchChapter();
  }, [chapterData, isEdit, reset]);

  const router = useRouter();

  const onSubmit = async (data: ChapterType) => {
    setIsLoading(true);

    const validatedData = chapterValidator.parse(data);

    await fetch(
      isEdit
        ? `/api/chapter/${comicId}/edit/${chapterId}`
        : `/api/chapter/${comicId}/add`,
      {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(validatedData),
      }
    )
      .then((response) => {
        if (response.status === 409) {
          setTimeout(() => {
            setError("chapter_name", {
              message: response.statusText,
            });
          }, 1);
          return;
        }
        return response;
      })
      .then((response) => {
        if (response && response.ok) {
          if (isEdit) {
            toast.success("Successfully edit chapter.");
            router.push(`/dashboard/comic/${comicId}/chapters`);
          } else {
            toast.success("Successfully create new chapter.");
            widgetsProps.setWidgets([]);
            reset();
          }
        }
      })
      .catch((error) => {
        toast.error(`Failed to create/update new chapter, Error: ${error}`);
      })
      .finally(() => {
        clearErrors();
        setIsLoading(false);
      });
  };

  return (
    <Container
      maxHeight
      className="flex-1 w-full h-full overflow-y-scroll flex flex-col pt-0"
    >
      <Title
        title={isEdit ? "Edit Chapter" : "Add Chapter"}
        description={`Please ${isEdit ? "edit" : "add"} a chapter for ${
          comicName ? `${comicName}` : "..."
        }`}
        containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
      />

      <form
        method={isEdit ? "PATCH" : "POST"}
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col px-2"
      >
        <StaticInput
          name="chapter_name"
          isRequired
          disabled={isLoading}
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
          render={({ field: { onChange, name, value } }) => (
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
          {isLoading ? (
            <Spinner className="w-4 h-4" />
          ) : isEdit ? (
            "Edit"
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Container>
  );
}

export default FormAddEditChapter;
