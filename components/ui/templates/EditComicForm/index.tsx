"use client";

import { GENRE, STATUS } from "@/assets/constants/category";
import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import FormAddEditComic from "../../organisms/FormAddEditComic";
import { BC_DASHBOARD_COMIC_EDIT } from "@/assets/constants/breadcrumbs";
import useFetchSingle from "@/hooks/useFetchSingle";
import { ComicType } from "@/util/validations";

export interface EditComicFormProps {
  comicId: string;
  userId: string;
}

export default function EditComicForm({ comicId, userId }: EditComicFormProps) {
  const data = useFetchSingle<ComicType>({
    url: `/api/comic/get-by-comic-id/${comicId}`,
  });

  return (
    <>
      <BreadcrumbList data={BC_DASHBOARD_COMIC_EDIT(data?.name || "")} />

      <Container
        maxHeight
        className="flex-1 overflow-y-scroll flex flex-col pt-0"
      >
        <Title
          title="Edit Comic"
          description="Edit your existed Comic"
          containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
        />

        <FormAddEditComic
          isEdit
          comicData={data}
          userId={userId}
          statusData={STATUS}
          genreData={GENRE}
        />
      </Container>
    </>
  );
}
