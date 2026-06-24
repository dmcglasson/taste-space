import { pgTable, uuid, varchar, text, boolean, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Recipes Table
export const recipes = pgTable('recipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  
  // Structured JSONB Array to prevent future destructive refactoring
  // Format: Array of { amount: number, unit: string, name: string }
  ingredients: jsonb('ingredients').$type<{ amount: number; unit: string; name: string }[]>().notNull(),
  
  instructions: text('instructions').array().notNull(), // Step-by-step array
  isPublic: boolean('is_public').default(true).notNull(), // Privacy toggle
  
  // Relational Foreign Key back to the User who created it
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});