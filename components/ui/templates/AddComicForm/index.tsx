"use client";

import { GENRE, STATUS } from "@assets/category";
import { BC_DASHBOARD_COMIC_ADD } from "@assets/breadcrumbs";

import { Container, Title } from "@ui/atoms";
import { BreadcrumbList } from "@ui/molecules";
import { FormAddEditComic } from "@ui/organisms";

export interface AddComicFormProps {
  userId: string;
}

export function AddComicForm({ userId }: AddComicFormProps) {
  return (
    <>
      <BreadcrumbList data={BC_DASHBOARD_COMIC_ADD} />

      <Container
        maxHeight
        className="flex-1 overflow-y-scroll flex flex-col pt-0"
      >
        <Title
          title="Add Comic"
          description="Adding your Comic to Database"
          containerClass="pt-4 mb-4 sticky top-0 bg-white z-10"
        />

        <FormAddEditComic
          userId={userId}
          statusData={STATUS}
          genreData={GENRE}
        />
      </Container>
    </>
  );
}

export default AddComicForm;
