import { Comic, connectToDB } from "@/util";
import type { NextApiRequest } from "next";

type comicParams = {
  comicId: string;
};

export const GET = async (
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

    const res = await Comic.findOne({
      _id: comicId,
    }).select(["-chapters"]);

    const comicData = JSON.stringify(res) as string;

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
