import { connectToDB } from "@database";
import { Comic } from "@models/Comic";
import { Comment } from "@models/Comment";

export const GET = async (
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
    const { chapterId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const comicData = await Comic.findOne({
      chapters: {
        _id: chapterId,
      },
    }).select("name");

    const commentData = await Comment.find({
      chapter: {
        _id: chapterId,
      },
    })
      .sort({ timestamp: -1 })
      .populate({
        path: "user",
        select: "name image",
      })
      .populate({
        path: "chapter",
        select: "-pages -__v",
      });

    const res = {
      comic: comicData,
      comments: commentData,
    };

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response(`Failed to create a new comment, Error: ${error}`, {
      status: 500,
    });
  }
};
