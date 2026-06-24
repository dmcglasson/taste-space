import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // 1. Point to your schema definitions
  schema: './db/schema.ts',
  
  // 2. Specify where auto-generated SQL migrations should be saved
  out: './migrations',
  
  // 3. Define the database dialect (PostgreSQL)
  dialect: 'postgresql',
  
  // 4. Pass your Neon credentials securely using your environment variables
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});