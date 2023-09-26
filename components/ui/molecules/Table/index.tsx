"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Pagination from "../Pagination";
import React from "react";

export interface TableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[];
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Table<TData extends object>({
  data,
  columns,
  text,
  setText,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: text,
    },
    onGlobalFilterChange: setText,
  });

  return (
    <>
      <div className="w-full mb-4 border border-blue-gray-100 rounded-xl overflow-y-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const hasMeta =
                    header.getContext().header.column.columnDef.meta;

                  return (
                    <th
                      key={header.id}
                      className={`sticky top-0 z-10 border-b border-blue-gray-100 bg-blue-gray-50 p-4 ${
                        hasMeta && hasMeta.thClassName
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  const hasMeta = cell.getContext().cell.column.columnDef.meta;

                  return (
                    <td
                      key={cell.id}
                      className={`p-4 ${hasMeta && hasMeta.tdClassName}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination table={table} />
    </>
  );
}
