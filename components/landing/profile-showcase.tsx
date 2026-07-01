import Image from "next/image";
import { Star, MapPin, Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const topFive = [
  { name: "Midnight Ramen", img: "/images/dish-ramen.png", rank: 1 },
  { name: "Sunday Pancakes", img: "/images/dish-pancakes.png", rank: 2 },
  { name: "Harvest Grain Bowl", img: "/images/dish-salad.png", rank: 3 },
];

const guestbook = [
  { author: "mia_bakes", note: "That ramen recipe changed my weeknights forever!" },
  { author: "chef_reuben", note: "Forked your grain bowl — added tahini, chef's kiss." },
];

export function ProfileShowcase() {
  return (
    <section id="profiles" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 rounded-full px-3 py-1 text-secondary-foreground"
          >
            <Star className="size-3.5 fill-primary text-primary" />
            Profiles with personality
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Remember when your profile felt like <span className="text-primary">yours?</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Curate a culinary identity that actually reflects you. Pin your Top 5
            dishes, collect notes in your guestbook, and let friends fork the
            recipes they love — all with a wink to the social web we grew up on.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "Top 5 showcase, enforced by transactional server actions",
              "A guestbook for friends to leave notes and reactions",
              "Public/private toggle on every recipe you post",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Star className="size-3 fill-primary" />
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card className="overflow-hidden border-border shadow-lg">
          <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/70" />
          <CardHeader className="-mt-12 flex-row items-end gap-4 space-y-0">
            <Avatar className="size-20 border-4 border-card">
              <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                DC
              </AvatarFallback>
            </Avatar>
            <div className="pb-1">
              <CardTitle className="font-heading text-xl">Dana Cortez</CardTitle>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" /> Austin, TX · 214 recipes
              </p>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <div>
              <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                My Top 5
              </p>
              <div className="grid grid-cols-3 gap-3">
                {topFive.map((dish) => (
                  <div key={dish.name} className="flex flex-col gap-1.5">
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
                      <Image
                        src={dish.img}
                        alt={dish.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                      <span className="absolute left-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                        {dish.rank}
                      </span>
                    </div>
                    <p className="truncate text-xs font-medium">{dish.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Guestbook
              </p>
              <div className="flex flex-col gap-3">
                {guestbook.map((entry) => (
                  <div
                    key={entry.author}
                    className="flex gap-3 rounded-xl bg-muted/60 p-3"
                  >
                    <Quote className="size-4 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">@{entry.author}</span>{" "}
                      <span className="text-muted-foreground">{entry.note}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
