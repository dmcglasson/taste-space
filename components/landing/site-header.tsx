import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Discover", href: "#discover" },
  { label: "Features", href: "#features" },
  { label: "Profiles", href: "#profiles" },
  { label: "Community", href: "#community" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ChefHat className="size-5" />
          </span>
          <span className="font-heading text-xl font-semibold tracking-tight">
            TasteSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/sign-in" />}
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            Sign in
          </Button>
          <Button render={<Link href="/sign-up" />}>Join free</Button>
        </div>
      </div>
    </header>
  );
}
