import React from "react";

export interface FetchProps {
  url: string;
}

export default function useFetchSingle<Data>({ url }: FetchProps) {
  const [data, setData] = React.useState<Data>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        const data: Data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (url) fetchData();
  }, [url]);

  return data;
}