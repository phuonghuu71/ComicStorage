import React from "react";
import GeneratePageIndex from "@/helper/GeneratePageIndex";

export interface usePageNumberProps {
  pageSize: number;
  pageCount: number;
  currentPage: number;
}

export default function usePageNumber({
  pageSize,
  pageCount,
  currentPage,
}: usePageNumberProps) {
  const pageLimit = Math.floor(pageSize / 2);
  const [firstIndex, setFirstIndex] = React.useState<number>(0);

  React.useEffect(() => {
    if (currentPage > firstIndex + pageLimit) setFirstIndex((prev) => prev + 1);
    if (currentPage < firstIndex + pageLimit) setFirstIndex((prev) => prev - 1);
  }, [currentPage, firstIndex, pageLimit]);

  const result = GeneratePageIndex(pageSize, firstIndex, pageCount);

  return result;
}
