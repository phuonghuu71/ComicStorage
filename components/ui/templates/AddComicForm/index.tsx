import { BC_DASHBOARD_COMIC_ADD } from "@/assets/constants/breadcrumbs";
import BreadcrumbList from "../../molecules/BreadcrumbList";
import Container from "../../atoms/Container";
import Title from "../../atoms/Title";
import FormAddEditComic from "../../organisms/FormAddEditComic";
import { GENRE, STATUS } from "@/assets/constants/category";

export interface AddComicFormProps {
  userId: string;
}

export default function AddComicForm({ userId }: AddComicFormProps) {
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
