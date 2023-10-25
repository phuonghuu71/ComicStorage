import PaginatingData from "@helpers/PaginatingData";
import { connectToDB } from "@database";
import { Comic } from "@models/Comic";
import type { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  try {
    const { _limit, _startIndex } = PaginatingData(req);

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const res = await Comic.find({
      "chapters.0": {
        $exists: true,
      },
    })
      .populate("uploader")
      .sort({
        last_update: -1,
      })
      .limit(_limit)
      .skip(_startIndex);

    const countComics = res.length;

    const totalComic = Math.ceil(countComics / _limit);

    const comicData = JSON.stringify({
      comics: [...res],
      numberOfPages: totalComic,
    }) as string;

    return new Response(comicData, { status: 200 });
  } catch (error) {
    return new Response(
      `An Error occurred while trying to retrieve data, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
