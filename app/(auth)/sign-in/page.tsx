import Link from "next/link";
import SignInForm from "./sign-in-form";

export const metadata = {
  title: "Sign In · TasteSpace",
  description: "Sign in to your account.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to get back to your recipes and cookbooks.
        </p>
      </div>

      <SignInForm />

      <p className="text-center text-sm text-muted-foreground">
        New to TasteSpace?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
