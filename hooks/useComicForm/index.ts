import React from "react";

import { ComicType, comicValidator } from "@validators";

import { useRouter } from "next/navigation";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

export interface UseComicFormProps {
  reset: UseFormReset<any>;
  setError: UseFormSetError<any>;
  isEdit?: boolean;
  comicId?: string;
}

export function useComicForm({
  reset,
  setError,
  isEdit,
  comicId,
}: UseComicFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: ComicType) => {
    setIsLoading(true);

    const validatedData = comicValidator.parse(data);

    await fetch(isEdit ? `/api/comic/edit/${comicId}` : "/api/comic/add", {
      method: isEdit ? "PATCH" : "POST",
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
          if (isEdit) {
            toast.success("Successfully update comic.");
            router.push("/dashboard/comic");
          } else toast.success("Successfully create new comic.");

          reset();
        }
      })
      .catch((error) => {
        toast.error(`Failed to create/update new comic, Error: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    onSubmit,
  };
}

export default useComicForm;
