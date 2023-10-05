"use client";

import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usePageNumber } from "@hooks";

/* eslint-disable-next-line */
export interface PaginationProps {
  pageCount: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

export function Pagination({ pageCount, setCurrPage, limit }: PaginationProps) {
  const [active, setActive] = React.useState<number>(1);
  const fetchPages = usePageNumber({
    pageSize: pageCount < limit ? pageCount : limit,
    pageCount: pageCount,
    currentPage: active - 1,
  });

  React.useEffect(() => {
    if (active) setCurrPage(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "purple",
      onClick: () => goToPage(index - 1),
      className: "rounded-full",
    } as any);

  const goToPage = React.useCallback((i: number) => {
    setActive(i + 1);
  }, []);

  const next = React.useCallback(() => {
    if (active === pageCount) return;

    setActive((prev) => prev + 1);
  }, [pageCount, active]);

  const prev = React.useCallback(() => {
    if (active === 1) return;

    setActive((prev) => prev - 1);
  }, [active]);

  return (
    <div className="flex items-center gap-4 ml-auto">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {fetchPages.map((page, i) => (
          <IconButton
            disabled={page.pageIndex === active - 1}
            key={i}
            {...getItemProps(page.pageIndex + 1)}
          >
            {page.pageIndex + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === pageCount}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
