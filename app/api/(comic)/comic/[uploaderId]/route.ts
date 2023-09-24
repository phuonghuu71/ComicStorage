import { Comic, connectToDB } from "@/util";
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

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const res = await Comic.find({
      uploader: {
        _id: uploaderId,
      },
    }).populate("uploader");

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
