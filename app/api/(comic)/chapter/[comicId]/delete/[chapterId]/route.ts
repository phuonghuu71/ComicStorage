import { connectToDB } from "@database";
import { Chapter } from "@models/Chapter";
import { Comic } from "@models/Comic";
import { NextApiHandler } from "next";

type chapterParams = {
  comicId: string;
  chapterId: string;
};
export const DELETE = async (
  req: NextApiHandler,
  {
    params,
  }: {
    params: chapterParams;
  }
) => {
  try {
    const { comicId, chapterId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    await Comic.findByIdAndUpdate(
      comicId,
      {
        $pull: {
          chapters: chapterId,
        },
      },
      { new: true, useFindAndModify: false }
    );

    const findDeletedById = await Chapter.findOne({
      _id: chapterId,
    });

    await Chapter.findByIdAndRemove(chapterId);

    return new Response(JSON.stringify(findDeletedById), { status: 200 });
  } catch (error) {
    return new Response(`Failed to delete chapter, Error: ${error}`, {
      status: 500,
    });
  }
};
