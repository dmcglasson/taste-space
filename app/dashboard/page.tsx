import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChefHat } from "lucide-react";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/40">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-2 px-4 sm:px-6">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ChefHat className="size-5" />
          </span>
          <span className="font-heading text-xl font-semibold">TasteSpace</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Welcome back{session.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your kitchen is ready. Recipes, cookbooks, and your Top 5 will live here.
        </p>
      </main>
    </div>
  )
}
