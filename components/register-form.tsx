// components/register-form.tsx
"use client";

import { registerUser, type ActionResponse } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function RegisterForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    async (_prevState: ActionResponse, formData: FormData) => {
      return registerUser(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Join TasteSpace
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to start curating custom cookbooks.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-sm font-semibold text-gray-700">Username</label>
              <input
                name="username"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                placeholder="chef_alex"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                placeholder="alex@tastespace.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {state.message ? (
            <p
              className={`text-sm ${
                state.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              disabled={pending}
              className="group relative flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {pending ? "Creating account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}