import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type Phrase = {
  start: number;
  end: number;
  eyebrow?: string;
  title: string;
  align?: "center" | "left" | "right";
};

const PHRASES: Phrase[] = [
  { start: 0.0, end: 0.18, eyebrow: "FW · MMXXV", title: "CAELRIC" },
  { start: 0.2, end: 0.4, eyebrow: "Chapter I", title: "Crafted in Motion" },
  { start: 0.42, end: 0.62, eyebrow: "Chapter II", title: "Where Fabric Becomes Form" },
  { start: 0.64, end: 0.82, eyebrow: "Chapter III", title: "Elegance in Every Layer" },
  { start: 0.84, end: 1.0, eyebrow: "Finale", title: "Redefining Modern Luxury" },
];

function Phrase({
  phrase,
  progress,
}: {
  phrase: Phrase;
  progress: MotionValue<number>;
}) {
  const { start, end } = phrase;
  const fadeIn = start;
  const settle = start + (end - start) * 0.18;
  const linger = end - (end - start) * 0.22;
  const fadeOut = end;

  const opacity = useTransform(
    progress,
    [fadeIn, settle, linger, fadeOut],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [fadeIn, settle, linger, fadeOut],
    [40, 0, 0, -30]
  );
  const blur = useTransform(
    progress,
    [fadeIn, settle, linger, fadeOut],
    ["8px", "0px", "0px", "6px"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter: useTransform(blur, (b) => `blur(${b})`) }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-foreground will-change-transform"
    >
      {phrase.eyebrow && (
        <div className="mb-6 text-[10px] tracking-luxe uppercase text-foreground/70">
          {phrase.eyebrow}
        </div>
      )}
      <h2 className="font-serif font-light leading-[0.95] text-foreground text-[clamp(2.6rem,8vw,7.5rem)] tracking-[-0.01em]">
        {phrase.title}
      </h2>
      <div className="mt-8 h-px w-16 bg-foreground/40" />
    </motion.div>
  );
}

export function ScrollText({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={localRef} className="pointer-events-none absolute inset-0 z-10 mix-blend-difference text-white">
      {PHRASES.map((p, i) => (
        <Phrase key={i} phrase={p} progress={scrollYProgress} />
      ))}
    </div>
  );
}
