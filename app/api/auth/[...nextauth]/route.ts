import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDbProps, User, connectToDB } from "@util";
import { NextAuthOptions } from "next-auth";

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

        const props: MongoDbProps = {
          mongoDBUri: process.env.MONGODB_URI,
        };

        await connectToDB(props).catch(console.dir);

        // . Check if user already exists
        const userExist = await User.findOne({
          email: email,
        });

        if (!userExist) {
          await User.create({
            email: email,
            name: name,
            image: image,
          });
        }

        return true;
      } catch (err) {
        console.log("Error checking if user exists:", err);

        return false;
      }
    },
    // async jwt({ token, user }) {
    //   const dbUser = await User.findOne({ email: token.email });

    //   if (!dbUser) {
    //     if (user) {
    //       token.id = user.id;
    //     }

    //     return token;
    //   }

    //   return {
    //     id: dbUser._id.toString(),
    //     name: dbUser.name,
    //     email: dbUser.email,
    //     picture: dbUser.image,
    //   };
    // },
    async session({ session, token }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser && token) {
        session.user.id = sessionUser._id.toString();
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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
