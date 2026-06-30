import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/drizzle"
import { nextCookies } from "better-auth/next-js"
import * as schema from "@/db/schema"


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        length: 50,
        unique: true,
        required: true,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true
  },
  plugins: [nextCookies()]
})