"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

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
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={state.name}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <input
          name="email"
          type="email"
          required
          defaultValue={state.email}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <input
          name="username"
          type="text"
          required
          defaultValue={state.username}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <input
          name="password"
          type="password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
      </div>

      {state.error && (
        <div className="text-sm text-red-600">{state.error}</div>
      )}

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
        >
          {isPending ? "Creating account..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}