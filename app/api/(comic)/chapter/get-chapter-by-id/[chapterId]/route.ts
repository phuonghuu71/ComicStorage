import { connectToDB } from "@/util";
import { Chapter } from "@/util/models/Chapter";
import { NextApiRequest } from "next";

export const GET = async (
  req: NextApiRequest,
  {
    params,
  }: {
    params: {
      chapterId: string;
    };
  }
) => {
  try {
    const { chapterId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const fetchChapter = await Chapter.findOne({
      _id: chapterId,
    });

    const res = JSON.stringify(fetchChapter) as string;

    return new Response(res, { status: 201 });
  } catch (error) {
    return new Response(
      `An Error occurred while trying to retrieve data, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
