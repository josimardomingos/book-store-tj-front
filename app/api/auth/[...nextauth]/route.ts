import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          throw new Error("Please enter an email and password");
        }

        return {
          id: "1",
          name: "Josimar Domingos",
          email: "josimardomingos@gmail.com",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
