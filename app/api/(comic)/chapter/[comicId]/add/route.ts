import { Comic, connectToDB, Chapter } from "@utils";
import { ChapterType, ComicType } from "@validators";

type chapterParams = {
  comicId: string;
};

export const POST = async (
  req: Request,
  { params }: { params: chapterParams }
) => {
  try {
    const { comicId } = params;

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const data = (await req.json()) as string;

    const parsedChapter = JSON.parse(JSON.stringify(data)) as ChapterType;

    const getComic = await Comic.findOne({
      _id: comicId,
    }).populate("chapters");

    const parsedComic = JSON.parse(JSON.stringify(getComic)) as ComicType;

    const parsedChapters = JSON.parse(
      JSON.stringify(parsedComic.chapters)
    ) as ChapterType[];

    const isDup = parsedChapters.some(
      (chapter) => chapter.chapter_name === parsedChapter.chapter_name
    );

    if (isDup)
      return new Response(null, {
        status: 409,
        statusText: "The chapter exists. Please try another name.",
      });

    const newChapter = new Chapter(parsedChapter);

    await newChapter.save();

    const res = await Comic.findOneAndUpdate(
      {
        _id: comicId,
      },
      {
        $push: {
          chapters: {
            _id: newChapter._id,
          },
        },
      },
      {
        new: true,
      }
    );

    return new Response(JSON.stringify(res), {
      status: 201,
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
