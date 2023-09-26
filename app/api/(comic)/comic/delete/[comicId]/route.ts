import { Comic, connectToDB } from "@/util";

type comicParams = {
  comicId: string;
};

export const DELETE = async (
  req: Request,
  {
    params,
  }: {
    params: comicParams;
  }
) => {
  try {
    const { comicId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const findDeletedById = await Comic.findOne({
      _id: comicId,
    });

    await Comic.findByIdAndRemove(comicId);

    return new Response(JSON.stringify(findDeletedById), { status: 200 });
  } catch (error) {
    return new Response(
      `Failed to create/update a new comic, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
