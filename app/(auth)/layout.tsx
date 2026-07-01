import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChefHat, Star } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand / imagery panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/hero-dish.png"
          alt="A vibrant home-cooked meal spread"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 text-primary-foreground">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur">
              <ChefHat className="size-5" />
            </span>
            <span className="font-heading text-xl font-semibold">TasteSpace</span>
          </Link>
          <div className="flex flex-col gap-3">
            <Star className="size-6 fill-primary-foreground" />
            <p className="max-w-md font-heading text-2xl font-semibold leading-snug text-balance">
              &ldquo;My kitchen finally has a home online — Top 5 and all.&rdquo;
            </p>
            <p className="text-sm text-primary-foreground/80">
              Dana C. · 214 recipes shared
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ChefHat className="size-5" />
            </span>
            <span className="font-heading text-xl font-semibold">TasteSpace</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
