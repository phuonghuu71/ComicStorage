import React from "react";
import { FetchProps } from "..";

export function useFetch<Data>({ url }: FetchProps) {
  const [data, setData] = React.useState<Data[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}`);
        const data: Data[] = await response.json();

        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
  };
}

export default useFetch;
