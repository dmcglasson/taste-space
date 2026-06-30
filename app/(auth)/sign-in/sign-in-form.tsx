"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

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
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <input
          name="email"
          type="email"
          required
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isPending ? "Checking credentials..." : "Sign in"}
      </button>
    </form>
  );
}