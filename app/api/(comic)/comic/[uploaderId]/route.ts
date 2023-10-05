import { PaginatingData } from "@helpers";
import { Comic, connectToDB } from "@utils";
import type { NextApiRequest } from "next";

type userParams = {
  uploaderId: string;
};

export const GET = async (
  req: NextApiRequest,
  {
    params,
  }: {
    params: userParams;
  }
) => {
  try {
    const { uploaderId } = params;

    const { _limit, _startIndex } = PaginatingData(req);

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const res = await Comic.find({
      uploader: {
        _id: uploaderId,
      },
    })
      .select(["-cover"])
      .populate("uploader")
      .limit(_limit)
      .skip(_startIndex);

    const countComics = await Comic.find({
      uploader: {
        _id: uploaderId,
      },
    })
      .select(["-cover", "-chapters"])
      .countDocuments();

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
