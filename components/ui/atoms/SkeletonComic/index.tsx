export function SkeletonComic() {
  return (
    <div className="w-full flex flex-col items-end">
      <div className="bg-blue-gray-100 w-full h-[100px] animate-pulse rounded mb-2 last:mb-0" />
      <div className="bg-blue-gray-100 w-full h-[100px] animate-pulse rounded mb-2 last:mb-0" />
      <div className="bg-blue-gray-100 w-full h-[100px] animate-pulse rounded mb-2 last:mb-0" />
      <div className="bg-blue-gray-100 w-1/2 h-4 animate-pulse rounded mb-2 last:mb-0" />
    </div>
  );
}

export default SkeletonComic;
