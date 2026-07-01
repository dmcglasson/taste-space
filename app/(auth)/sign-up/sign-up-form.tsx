"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"

type FormState = {
  error: string | null;
  success: boolean;
  name: string;
  email: string;
  username: string;
}

const initialState: FormState = {
  error: null,
  success: false,
  name: "",
  email: "",
  username: "",
}

export default function SignUpForm() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData): Promise<FormState> => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      const updatedState: FormState = {
        ...prevState,
        name,
        email,
        username,
      };

      // Check if all required fields are filled
      if (!name || !email || !username || !password || !confirmPassword) {
        return { ...updatedState, success: false, error: "All fields are required." };
      }

      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { ...updatedState, success: false, error: "Invalid email address." };
      }

      // Check if password meets minimum length requirement
      if (password.length < 8) {
        return { ...updatedState, success: false, error: "Password must be at least 8 characters long." };
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return { ...updatedState, success: false, error: "Passwords do not match." };
      }

      try {
        const { data, error } = await authClient.signUp.email({
          name,
          email,
          username,
          password,
        });

        if (error) {
          return { ...updatedState, success: false, error: error.message || "Sign up failed." };
        }

        router.push("/sign-in");
        return { ...initialState, success: true, error: null };
      } catch (err) {
        return { ...updatedState, success: false, error: "An unexpected error occurred." };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" type="text" defaultValue={state.name} placeholder="Dana Cortez" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input id="email" name="email" type="email" defaultValue={state.email} placeholder="you@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" name="username" type="text" defaultValue={state.username} placeholder="danacooks" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" placeholder="At least 8 characters" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
        </Field>

        {state.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
