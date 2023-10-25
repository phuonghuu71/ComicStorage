import { connectToDB } from "@database";
import { Comic } from "@models/Comic";
import { ComicType } from "@validators/Comic";
import type { NextApiRequest } from "next";

type comicParams = {
  comicId: string;
};

export const PATCH = async (
  req: NextApiRequest,
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

    const getComic = await Comic.findOne({
      _id: comicId,
    }).select(["-chapters"]);

    const comicData = JSON.stringify(getComic) as string;
    const parsedComic = JSON.parse(comicData) as ComicType;
    const updatedView = parsedComic.views + 1;

    const updatedComic = await Comic.findOneAndUpdate(
      {
        _id: comicId,
      },
      {
        views: updatedView,
      }
    );

    const res = JSON.stringify(updatedComic) as string;

    return new Response("You have successfully update comic.", { status: 200 });
  } catch (error) {
    return new Response(
      `An Error occurred while trying to retrieve data, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
