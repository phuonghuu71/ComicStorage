import {
  Column,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { IconButton } from "@material-tailwind/react";
import Pagination from "../Pagination";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";

export interface TableProps<TData> {
  data: TData[];
  columns: Column<TData>[];
}

export default function Table<TData extends object>({
  data,
  columns,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="w-full mb-4 border border-blue-gray-100 rounded-xl overflow-hidden">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                No.
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Name
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Status
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Chapters
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Views
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Comments
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Date Upload
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4">1</td>
              <td className="p-4">Oshi no Ko</td>
              <td className="p-4">In Progress</td>
              <td className="p-4">1</td>
              <td className="p-4">100</td>
              <td className="p-4">20</td>
              <td className="p-4">12/9/2023 05:02 PM</td>
              <td>
                <div className="flex items-center gap-x-2">
                  <IconButton variant="text" className="rounded-full">
                    <PencilIcon className="w-5 h-5" />
                  </IconButton>
                  <IconButton variant="text" className="rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination />
    </>
  );
}
