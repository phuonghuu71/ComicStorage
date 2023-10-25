import PaginatingData from "@helpers/PaginatingData";
import { connectToDB } from "@database";
import { Chapter } from "@models/Chapter";
import { Comic } from "@models/Comic";
import { ComicType } from "@validators/Comic";
import { NextApiRequest } from "next";

export const GET = async (
  req: NextApiRequest,
  {
    params,
  }: {
    params: {
      comicId: string;
    };
  }
) => {
  try {
    const { comicId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const fetchComic = await Comic.findOne({
      _id: comicId,
    })
      .select(["-cover"])
      .populate({
        path: "chapters",
        model: Chapter,
        select: "-pages",
      });

    const comicData = JSON.stringify(fetchComic) as string;

    const parsedComicData = JSON.parse(comicData) as ComicType;

    const res = JSON.stringify(parsedComicData.chapters) as string;

    return new Response(res, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      `An Error occurred while trying to retrieve data, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
