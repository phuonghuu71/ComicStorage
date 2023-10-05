import ComicDetails from "@ui/templates/ComicDetails";

export default function Page({
  params,
}: {
  params: {
    comicId: string;
  };
}) {
  const {comicId} = params;
  return <ComicDetails comicId={comicId} />;
}
