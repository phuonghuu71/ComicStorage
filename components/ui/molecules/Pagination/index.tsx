"use client";

import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import usePageNumber from "@/hooks/usePageNumber";

/* eslint-disable-next-line */
export interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData extends object>({
  table,
}: PaginationProps<TData>) {
  const [active, setActive] = React.useState<number>(1);
  const fetchPages = usePageNumber({
    pageSize: table.getPageCount() < 5 ? table.getPageCount() : 5,
    pageCount: table.getPageCount(),
    currentPage: active - 1,
  });

  React.useEffect(() => {
    table.setPageSize(5);
  }, [table]);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "purple",
      onClick: () => goToPage(index - 1),
      className: "rounded-full",
    } as any);

  const goToPage = React.useCallback(
    (i: number) => {
      table.setPageIndex(i);
      setActive(i + 1);
    },
    [table]
  );

  const next = React.useCallback(() => {
    if (!table.getCanNextPage()) return;

    setActive((prev) => prev + 1);

    table.nextPage();
  }, [table]);

  const prev = React.useCallback(() => {
    if (!table.getCanPreviousPage()) return;

    setActive((prev) => prev - 1);

    table.previousPage();
  }, [table]);

  return (
    <div className="flex items-center gap-4 ml-auto">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {fetchPages.map((page, i) => (
          <IconButton key={i} {...getItemProps(page.pageIndex + 1)}>
            {page.pageIndex + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={!table.getCanNextPage()}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
