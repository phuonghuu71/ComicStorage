import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDbProps, User as ComicUser, connectToDB } from "@utils";
import { NextAuthOptions, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { name, email, image } = user;

        // . Check if user already exists
        if (email) {
          const props: MongoDbProps = {
            mongoDBUri: process.env.MONGODB_URI,
          };

          await connectToDB(props).catch(console.dir);

          console.log(email);

          const userExist = await ComicUser.findOne({
            email: email,
          });

          if (!userExist) {
            await ComicUser.create({
              email: email,
              name: name,
              image: image,
            });
          }
        }

        return true;
      } catch (err) {
        console.log("Error checking if user exists:", err);
        return false;
      }
    },
    // async jwt({ token, user }) {
    //   const dbUser = (await ComicUser.findOne({ email: token.email })) as
    //     | string
    //     | null;

    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user.id;
    //     }

    //     return token;
    //   }

    //   const parsedDbUser = JSON.parse(dbUser) as User;

    //   return {
    //     id: parsedDbUser.id,
    //     name: parsedDbUser.name,
    //     email: parsedDbUser.email,
    //     picture: parsedDbUser.image,
    //   };
    // },
    async session({ session, token }) {
      if (session.user.email) {
        const sessionUser = await ComicUser.findOne({
          email: session.user.email,
        });

        if (sessionUser && token) {
          session.user.id = sessionUser._id.toString();
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
        }
      }

      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
