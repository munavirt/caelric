import { useRef } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Navbar } from "@/components/Navbar";
import { ScrollSequenceCanvas } from "@/components/ScrollSequenceCanvas";
import { FinalHero } from "@/components/FinalHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  useLenis();
  const sequenceRef = useRef<HTMLDivElement | null>(null);

  return (
    <main id="top" className="relative bg-background text-foreground">
      <Navbar />

      {/* Opening title overlay */}
      <section className="relative h-screen w-full flex items-end justify-between px-6 md:px-12 pb-12 md:pb-16 bg-background">
        <div>
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-4">
            FW · MMXXV
          </div>
          <h1 className="font-serif font-light leading-[0.9] text-foreground text-[clamp(3.5rem,12vw,11rem)] tracking-[-0.02em]">
            CAELRIC
          </h1>
        </div>
        <div className="hidden md:block max-w-xs text-right">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A study in fabric, form and quiet motion. Scroll to enter the campaign.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 text-[10px] tracking-luxe uppercase text-foreground/70">
            <span className="h-px w-10 bg-foreground/40" />
            Scroll
          </div>
        </div>
      </section>

      {/* Scroll-driven cinematic sequence (500vh wrapper) */}
      <ScrollSequenceCanvas ref={sequenceRef} />

      <FinalHero />
      <ProductGrid />
      <Footer />
    </main>
  );
}
