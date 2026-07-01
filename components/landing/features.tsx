import {
  Sparkles,
  Scale,
  Search,
  Refrigerator,
  GitFork,
  History,
  BookOpen,
  ListChecks,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "AI social importer",
    description:
      "Paste a link from social media and let AI parse it into a clean, validated recipe object automatically.",
  },
  {
    icon: Scale,
    title: "Scalar yield multiplier",
    description:
      "Rescale every ingredient quantity instantly and reactively — no server round trips, no math headaches.",
  },
  {
    icon: Search,
    title: "Full-text search",
    description:
      "Postgres-powered search across titles, descriptions, and tags with fast, relevant results.",
  },
  {
    icon: Refrigerator,
    title: "What's in my fridge?",
    description:
      "Match recipes to the ingredients you already have on hand, with an AI fallback when nothing fits.",
  },
  {
    icon: GitFork,
    title: "Social forking",
    description:
      "Deep-clone any public recipe to make it your own, with permanent attribution back to the original chef.",
  },
  {
    icon: History,
    title: "Git for food",
    description:
      "An append-only history ledger captures every snapshot so you can view and diff recipe versions over time.",
  },
  {
    icon: BookOpen,
    title: "Collaborative cookbooks",
    description:
      "Group recipes into themed collections and invite friends as owners, editors, or viewers.",
  },
  {
    icon: ListChecks,
    title: "Grocery aggregator",
    description:
      "Consolidate ingredient quantities across selected recipes into one smart, deduplicated shopping list.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-y border-border bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
            Everything in one kitchen
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Modern engineering, home-cooked feel
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Beneath the cozy exterior is a serious 2026 stack — AI pipelines,
            full-text search, and version control for your recipes.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/70 transition-colors hover:border-primary/40"
            >
              <CardHeader>
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="font-heading text-lg">
                  {feature.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
