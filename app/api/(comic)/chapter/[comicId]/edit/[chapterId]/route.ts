import { connectToDB } from "@database";
import { Chapter } from "@models/Chapter";
import { ChapterType } from "@validators/Chapter";

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: {
      chapterId: string;
    };
  }
) => {
  try {
    const data = await req.json();

    const { chapterId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const fetchChapterById = (await Chapter.findOne({
      _id: chapterId,
    })) as ChapterType;

    if (!fetchChapterById)
      return new Response("Chapter not found", {
        status: 404,
      });

    const updatedChapter = await Chapter.findOneAndUpdate(
      {
        _id: chapterId,
      },
      data
    );

    return new Response(JSON.stringify(updatedChapter), { status: 201 });
  } catch (error) {
    return new Response(
      `Failed to create/update a new comic, Error: ${error}`,
      {
        status: 500,
      }
    );
  }
};
