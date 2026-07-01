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
};

const initialState: FormState = {
  error: null,
  success: false,
};

export default function SignInForm() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        return { success: false, error: "Email and password are required." };
      }

      try {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          return { success: false, error: error.message || "Invalid credentials." };
        }

        router.push("/dashboard");
        return { success: true, error: null };
      } catch (err) {
        return { success: false, error: "An unexpected error occurred." };
      }
    },
    initialState
  );

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </Field>

        {state.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Checking credentials..." : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
