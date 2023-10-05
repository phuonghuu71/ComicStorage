import React from "react";
import { setTimeout } from "timers";

export interface FetchProps {
  url: string;
  reload?: boolean;
}

export function useFetchSingle<Data>({ url, reload }: FetchProps) {
  const [data, setData] = React.useState<Data>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}`);
      const data: Data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [url]);

  React.useEffect(() => {
    if (url || reload) {
      fetchData();
    }
  }, [url, reload, fetchData]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
  };
}

export default useFetchSingle;
