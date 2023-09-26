import { Comic, connectToDB } from "@/util";
import { ComicType } from "@/util/validations";

type comicParams = {
  comicId: string;
};

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: comicParams;
  }
) => {
  try {
    const data = await req.json();

    const { comicId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const fetchComicById = (await Comic.findOne({
      _id: comicId,
    })) as ComicType;

    if (!fetchComicById)
      return new Response("Comic not found", {
        status: 404,
      });

    const isDup = (await Comic.findOne({ name: data.name })) as ComicType;

    if (isDup && data.name !== fetchComicById.name)
      return new Response(null, {
        status: 409,
        statusText: "The comic exists. Please try another name.",
      });

    const updatedComic = await Comic.findOneAndUpdate(
      {
        _id: comicId,
      },
      data
    );

    return new Response(JSON.stringify(updatedComic), { status: 201 });
  } catch (error) {
    return new Response(
      `Failed to create/update a new comic, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
