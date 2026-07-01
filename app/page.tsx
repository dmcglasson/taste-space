import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { ProfileShowcase } from "@/components/landing/profile-showcase";
import { CtaFooter } from "@/components/landing/cta-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <ProfileShowcase />
        <CtaFooter />
      </main>
    </div>
  );
}
