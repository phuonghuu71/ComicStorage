export type comicParams = {
  comicId: string;
};

export const POST = ({ params }: { params: comicParams }) => {
  const { comicId } = params;
};
