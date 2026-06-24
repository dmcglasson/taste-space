import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Look up the user in your Neon database using Drizzle
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        // 2. If user doesn't exist, block entry
        if (!user) {
          return null;
        }

        // 3. Verify the password hash matches securely
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordsMatch) {
          return null;
        }

        // 4. Return user object to establish session (exclude password hash for security)
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    // Attach the user ID to the session object so Server Actions can check ownership
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page route we can build later
  },
  session: { strategy: "jwt" },
});