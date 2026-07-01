import Link from "next/link";
import SignUpForm from "./sign-up-form";

export const metadata = {
  title: "Sign Up · TasteSpace",
  description: "Create a new account.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Create your space
        </h1>
        <p className="text-muted-foreground">
          Start curating recipes and building your culinary identity.
        </p>
      </div>

      <SignUpForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
