import { connectToDB } from "@database";
import { Comment } from "@models/Comment";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const newComment = new Comment({
      ...data,
      timestamp: new Date().toISOString(),
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(`Failed to create a new comment, Error: ${error}`, {
      status: 500,
    });
  }
};
