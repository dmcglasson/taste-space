"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Basic structured interface for form state tracking
export interface ActionResponse {
  success: boolean;
  message: string;
}

/**
 * Server Action to securely handle new user registration for TasteSpace
 */
export async function registerUser(formData: FormData): Promise<ActionResponse> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Structural Server-Side Input Validation
  if (!username || !email || !password) {
    return { success: false, message: "All form fields are strictly required." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  try {
    // 2. Validate Duplicate Constraints against Neon
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existingUser) {
      return { success: false, message: "An account with this email already exists." };
    }

    // 3. Hash the raw credentials securely using 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Fire the secure Drizzle mutation pipeline
    await db.insert(users).values({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: passwordHash,
    });

    return { success: true, message: "Account created successfully! You can now log in." };

  } catch (error) {
    console.error("Critical Registration Failure: ", error);
    return { success: false, message: "A database mutation error occurred. Please try again." };
  }
}