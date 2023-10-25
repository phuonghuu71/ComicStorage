type fetchOptions = {
  url: string;
};

type fetchWithPaginationOptions = fetchOptions & {
  page: number;
  limit: number;
};

export const fetcherWithPagination = async ({
  url,
  page,
  limit,
}: fetchWithPaginationOptions) => {
  const res = await fetch(`${url}?page=${page}&limit=${limit}`);

  return res.json();
};

export async function useFetch<Data>({ url }: fetchOptions) {
  const res = await fetch(`http://localhost:3000/${url}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await res.json()) as Data;

  return {
    data,
  };
}

export default useFetch;
