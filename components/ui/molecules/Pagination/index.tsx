"use client";

import React from "react";

import usePageNumber from "@hooks/usePageNumber";

import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

/* eslint-disable-next-line */
export interface PaginationProps {
  pageCount: number;
  limit: number;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

export function Pagination({
  pageCount,
  limit,
  active,
  setActive,
}: PaginationProps) {
  const fetchPages = usePageNumber({
    pageSize: pageCount < limit ? pageCount : limit,
    pageCount: pageCount,
    currentPage: active - 1,
  });

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "purple",
      onClick: () => goToPage(index - 1),
      className: "rounded-full",
    } as any);

  const goToPage = React.useCallback(
    (i: number) => {
      setActive(i + 1);
    },
    [setActive]
  );

  const next = React.useCallback(() => {
    if (active === pageCount) return;

    setActive((prev) => prev + 1);
  }, [pageCount, active, setActive]);

  const prev = React.useCallback(() => {
    if (active === 1) return;

    setActive((prev) => prev - 1);
  }, [active, setActive]);

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
