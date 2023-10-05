import { Comic, connectToDB } from "@utils";

export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    await connectToDB({
      mongoDBUri: process.env.MONGODB_URI,
    });

    const isDup = await Comic.findOne({ name: data.name });

    if (isDup)
      return new Response(null, {
        status: 409,
        statusText: "The comic exists. Please try another name.",
      });

    const newComic = new Comic(data);

    await newComic.save();

    return new Response(JSON.stringify(newComic), { status: 201 });
  } catch (error) {
    return new Response(`Failed to create a new comic, Error: ${error}`, {
      status: 500,
    });
  }
};
