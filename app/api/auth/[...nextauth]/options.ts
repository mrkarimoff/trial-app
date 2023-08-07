import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/denied",
  },
  callbacks: {
    async session({ session, token }) {
      // Check if the user already exists in the database based on their email
      const existingUser = await prisma.user.findUnique({
        where: { email: session.user.email as string },
      });
      if (existingUser) {
        session.user.role = existingUser.role;
        token.role = existingUser.role;
      }
      return session;
    },
    async signIn({ user }) {
      // Check if the user already exists in the database based on their email
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!existingUser) {
        // User doesn't exist, create a new user in the database
        await prisma.user.create({
          data: {
            name: user.name as string,
            email: user.email as string,
            image: user.image as string,
          },
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
