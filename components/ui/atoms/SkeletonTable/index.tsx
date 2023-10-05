export function SkeletonTable() {
  return (
    <>
      <div className="w-full mb-4 border border-blue-gray-100 rounded-xl overflow-y-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="sticky top-0 z-10 border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </th>

              <th className="sticky top-0 z-10 border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </th>

              <th className="sticky top-0 z-10 border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </th>

              <th className="sticky top-0 z-10 border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 cursor-pointer transition-colors">
              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>

              <td className="p-4">
                <div className="bg-blue-gray-100 w-full h-4 animate-pulse rounded" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-gray-100 w-64 h-4 animate-pulse rounded ml-auto" />
    </>
  );
}

export default SkeletonTable;
