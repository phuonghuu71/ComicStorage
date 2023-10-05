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

    const { _limit, _startIndex } = PaginatingData(req);

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
        options: {
          limit: _limit,
          skip: _startIndex,
        },
      });

    const comicData = JSON.stringify(fetchComic) as string;

    const parsedComicData = JSON.parse(comicData) as ComicType;

    const fetchTotalChapters = await Comic.findOne({
      _id: comicId,
    })
      .select(["-cover"])
      .populate({
        path: "chapters",
        model: Chapter,
      });

    const totalChapters = Math.ceil(
      fetchTotalChapters.chapters?.length / _limit
    );

    const res = JSON.stringify({
      chapters: [parsedComicData.chapters],
      numberOfPages: totalChapters,
    }) as string;

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
