import React from "react";
import { FetchProps } from "..";

export default function useFetch<Data>({ url }: FetchProps) {
  const [data, setData] = React.useState<Data[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
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
