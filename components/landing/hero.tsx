import Link from "next/link";
import Image from "next/image";
import { Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Hero() {
  return (
    <section id="discover" className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 rounded-full px-3 py-1 text-secondary-foreground"
          >
            <Sparkles className="size-3.5 text-primary" />
            The social cookbook for home chefs
          </Badge>

          <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Your culinary identity,{" "}
            <span className="text-primary">served with a side of nostalgia.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            TasteSpace is where home chefs curate recipes, scale any formula
            instantly, fork dishes from friends, and show off their Top 5. Part
            modern kitchen, part throwback social network.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="/sign-up" />} size="lg" className="text-base">
              Start your space
            </Button>
            <Button render={<a href="#features" />} size="lg" variant="outline" className="text-base">
              Take a tour
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["A", "M", "J", "R"].map((initial) => (
                <Avatar key={initial} className="size-9 border-2 border-background">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                    {initial}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">12,400+</span>{" "}
              home chefs sharing recipes
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border shadow-xl">
            <Image
              src="/images/hero-dish.png"
              alt="An overhead spread of a home-cooked meal with pasta, bread, and fresh herbs"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="size-5 fill-primary" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">Top 5 Showcase</p>
              <p className="text-xs text-muted-foreground">Pin your best dishes</p>
            </div>
          </div>

          <div className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:-right-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent/30 text-accent-foreground">
              <Users className="size-5" />
            </span>
            <div>
              <p className="font-heading text-sm font-semibold">Fork & remix</p>
              <p className="text-xs text-muted-foreground">Credit the original</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
