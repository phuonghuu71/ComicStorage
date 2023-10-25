import useSWR, { Fetcher } from "swr";

type fetchOptions = {
  url: string;
};

export const fetcher: Fetcher<any, string> = async (url) => {
  const res = await fetch(`${url}`);

  return res.json();
};

export const useFetchComicById = <Data>({ comicId }: { comicId: string }) => {
  return useSWR<Data>(`/api/comic/get-by-comic-id/${comicId}`, fetcher);
};

export const useFetchChapterById = <Data>({
  chapterId,
}: {
  chapterId: string;
}) => {
  return useSWR<Data>(`/api/chapter/get-chapter-by-id/${chapterId}`, fetcher);
};

export const useFetchChaptersById = <Data>({
  comicId,
  page,
  limit,
}: {
  comicId: string;
  page: number;
  limit: number;
}) => {
  return useSWR<Data>(
    `/api/chapter/${comicId}?page=${page}&limit=${limit}`,
    fetcher
  );
};

export const useFetchComics = <Data>({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useSWR<Data>(`/api/comic?page=${page}&limit=${limit}`, fetcher);
};

export const useFetchComicsById = <Data>({
  userId,
  page,
  limit,
}: {
  userId: string;
  page: number;
  limit: number;
}) => {
  return useSWR<Data>(
    `/api/comic/${userId}?page=${page}&limit=${limit}`,
    fetcher
  );
};
