import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <>
      <section id="community" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Claim your space in the kitchen
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/90 text-pretty">
            Join thousands of home chefs building living cookbooks, one recipe at
            a time. It&apos;s free to start.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/sign-up" />}
              size="lg"
              variant="secondary"
              className="text-base"
            >
              Create your profile
            </Button>
            <Button
              render={<Link href="/sign-in" />}
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              I already have one
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ChefHat className="size-4" />
            </span>
            <span className="font-heading text-lg font-semibold">TasteSpace</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Curate. Scale. Fork. Share. — Built for home chefs.
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TasteSpace
          </p>
        </div>
      </footer>
    </>
  );
}
