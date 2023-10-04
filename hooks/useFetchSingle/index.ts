import React from "react";

export interface FetchProps {
  url: string;
  reload?: boolean;
}

export default function useFetchSingle<Data>({ url, reload }: FetchProps) {
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
      setIsLoading(false);
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
