"use client";

import { BC_CHAPTER } from "@assets/breadcrumbs";
import { Button, Option, Select } from "@material-tailwind/react";
import Container from "@ui/atoms/Container";
import DynamicIcon from "@ui/atoms/DynamicIcon";
import RichTextEditor from "@ui/atoms/RichTextEditor";
import Title from "@ui/atoms/Title";
import BreadcrumbList from "@ui/molecules/BreadcrumbList";
import Comment from "@ui/molecules/Comment";
import { ChapterType } from "@validators/Chapter";
import { ComicType } from "@validators/Comic";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  CommentType,
  TotalCommentsType,
  commentValidator,
} from "@validators/Comment";

export default function ChapterDetails({
  comicData,
  chapterData,
  chaptersData,
  commentData,
  userId,
}: {
  comicData: ComicType;
  chapterData: ChapterType;
  chaptersData: ChapterType[];
  commentData: TotalCommentsType;
  userId: string;
}) {
  const router = useRouter();
  const [activeChapter, setActiveChapter] = React.useState<string | undefined>(
    chaptersData.find((chapter) => chapter._id === chapterData._id)?._id
  );

  const {
    register,
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentType>({
    defaultValues: {
      user: {
        _id: userId,
      },
      message: "",
      chapter: {
        _id: chapterData._id,
      },
    },
    resolver: zodResolver(commentValidator),
  });

  React.useEffect(() => {
    if (activeChapter !== chapterData._id) router.replace(`${activeChapter}`);
  }, [activeChapter, chapterData, router]);

  const handlePrev = (chapterId: string) => {
    const findPrevIndex =
      chaptersData.findIndex((chapter) => chapter._id === chapterId) - 1;
    setActiveChapter(chaptersData[findPrevIndex]._id);
  };

  const handleNext = (chapterId: string) => {
    const findPrevIndex =
      chaptersData.findIndex((chapter) => chapter._id === chapterId) + 1;
    setActiveChapter(chaptersData[findPrevIndex]._id);
  };

  const onSubmit = async (data: CommentType) => {
    await fetch(`/api/comment/chapter/add`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    router.refresh();
  };

  console.log(errors);

  return (
    <>
      <BreadcrumbList
        data={BC_CHAPTER(
          comicData.name,
          `/${comicData._id}`,
          chapterData.chapter_name
        )}
      />

      <div className="flex mb-4 gap-x-4">
        <Button
          disabled={chaptersData[0]._id === chapterData._id}
          onClick={() => handlePrev(activeChapter || "")}
          className="w-28"
        >
          PREV
        </Button>

        <Select
          variant={"outlined"}
          label="Chapters"
          value={activeChapter}
          onChange={(chapter) => setActiveChapter(chapter)}
        >
          {chaptersData.map((item) => (
            <Option key={item._id} value={item._id} className="mb-2 last:mb-0">
              {item.chapter_name}
            </Option>
          ))}
        </Select>

        <Button
          disabled={
            chaptersData[chaptersData.length - 1]._id === chapterData._id
          }
          onClick={() => handleNext(activeChapter || "")}
          className="w-28"
        >
          NEXT
        </Button>
      </div>

      <div className="mb-4 flex flex-col items-center">
        {chapterData?.pages.map((page) => (
          <div
            key={page.page_number}
            className="mb-2 last:mb-0 border-2 border-purple-500"
          >
            <Image
              src={page.page_img_url}
              alt="page"
              width={9999}
              height={9999}
              className="w-full h-full"
              priority
            />
          </div>
        ))}
      </div>

      <Container className="mb-4 border border-blue-gray-100">
        <Title
          title={
            <>
              <DynamicIcon
                solid
                icon="ChatBubbleLeftIcon"
                className="w-5 h-5"
              />
              Comments
            </>
          }
        />

        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex flex-col items-stretch"
        >
          <Controller
            name="message"
            control={control}
            render={({ field: { name, onChange, value } }) => (
              <RichTextEditor
                name={name}
                errors={errors}
                title=""
                id="comment"
                value={value}
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

          <Button type="submit" className="w-20 ml-auto">
            Post
          </Button>
        </form>

        <hr className="mb-4" />

        {commentData.comments.map((comment, i) => (
          <Comment
            key={comment._id || i}
            avatar={comment.user.image || ""}
            name={comment.user.name || ""}
            chapterName={comment.chapter.chapter_name || ""}
            comicName={commentData.comic.name}
            message={comment.message}
            timestamp={comment.timestamp || ""}
          />
        ))}
      </Container>
    </>
  );
}
