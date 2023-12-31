"use client";

import { GENRE, STATUS } from "@assets/category";
import { BC_DASHBOARD_COMIC_EDIT } from "@assets/breadcrumbs";

import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import FormAddEditComic from "../../organisms/FormAddEditComic";
import { ComicType } from "@validators/Comic";
import { useFetchComicById } from "@helpers/ClientFetch";

export interface EditComicFormProps {
  comicId: string;
  userId: string;
}

export function EditComicForm({ comicId, userId }: EditComicFormProps) {
  const { data: comicData } = useFetchComicById<ComicType>({ comicId });

  return (
    <>
      <BreadcrumbList
        data={BC_DASHBOARD_COMIC_EDIT(comicData ? comicData.name : "...")}
      />

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
          comicData={comicData}
          userId={userId}
          statusData={STATUS}
          genreData={GENRE}
        />
      </Container>
    </>
  );
}

export default EditComicForm;
