import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const VIDEO_SRC = "/sequence/model.mp4";

/** Per-chapter animated word — owns its own hooks to satisfy Rules of Hooks. */
function ChapterWord({
  chapter,
  index,
  total,
  sp,
}: {
  chapter: { subtitle: string; title: string };
  index: number;
  total: number;
  sp: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(sp, [start, start + 0.04, end - 0.04, end], [0, 1, 1, 0]);
  const y = useTransform(sp, [start, end], [60, -60]);
  const blur = useTransform(sp, [start, mid, end], ["16px", "0px", "16px"]);
  const filter = useTransform(blur, (b) => `blur(${b})`);
  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6"
    >
      <span className="font-sans text-[10px] md:text-[12px] tracking-[0.4em] uppercase text-white/90">
        {chapter.subtitle}
      </span>
      <span
        className="font-serif italic text-white text-[15vw] md:text-[12vw] leading-none tracking-[-0.02em] select-none"
        style={{ textShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
      >
        {chapter.title}
      </span>
    </motion.div>
  );
}

/**
 * Scroll-driven cinematic sequence with luxury typographic animations.
 * Hydration-safe: overlays only mount after client mount + ready.
 */
export const ScrollSequenceCanvas = forwardRef<HTMLDivElement, {
  children?: React.ReactNode;
}>(function ScrollSequenceCanvas({ children }, externalRef) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(externalRef, () => wrapperRef.current as HTMLDivElement, []);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const seekingRef = useRef(false);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  // Chapter words
  const chapters = [
    { subtitle: "Chapter I", title: "Form" },
    { subtitle: "Chapter II", title: "Silence" },
    { subtitle: "Chapter III", title: "Shadow" },
    { subtitle: "Chapter IV", title: "Cloth" },
    { subtitle: "Finale", title: "Caelric" },
  ];

  // Overlay motion values
  const topOp = useTransform(sp, [0, 0.12, 0.88, 1], [1, 0.85, 0.85, 0]);
  const bottomOp = useTransform(sp, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  // Big chapter type — drifts horizontally
  const bigX = useTransform(sp, [0, 1], ["-8%", "8%"]);
  const bigScale = useTransform(sp, [0, 0.5, 1], [1.05, 1, 1.05]);

  const lookText = useTransform(sp, (p) =>
    String(Math.min(5, Math.max(1, Math.floor(p * 5) + 1))).padStart(2, "0")
  );

  // Video preload
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onProgress = () => {
      try {
        if (video.buffered.length && video.duration) {
          const buffered = video.buffered.end(video.buffered.length - 1);
          setProgress(Math.min(1, buffered / video.duration));
        }
      } catch {/* noop */}
    };
    const finishReady = () => {
      durationRef.current = video.duration || 0;
      setProgress(1);
      setReady(true);
    };
    const onLoadedMetadata = () => { durationRef.current = video.duration || 0; };
    const onSeeking = () => { seekingRef.current = true; };
    const onSeeked = () => { seekingRef.current = false; };

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", finishReady);
    video.addEventListener("loadeddata", finishReady);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    video.load();
    const safety = window.setTimeout(() => setReady(true), 4000);

    return () => {
      window.clearTimeout(safety);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", finishReady);
      video.removeEventListener("loadeddata", finishReady);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // Scroll → video time
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const dur = durationRef.current;
      if (dur > 0) targetTimeRef.current = Math.min(dur - 0.05, Math.max(0, p * dur));
    };

    const tick = () => {
      const video = videoRef.current;
      if (video && durationRef.current > 0 && !seekingRef.current) {
        const cur = currentTimeRef.current;
        const tgt = targetTimeRef.current;
        const diff = tgt - cur;
        const next = Math.abs(diff) < 0.002 ? tgt : cur + diff * 0.15;
        currentTimeRef.current = next;
        if (Math.abs(video.currentTime - next) > 0.03) {
          try { video.currentTime = next; } catch {/* seek guard */}
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full h-[500vh] bg-background"
      id="story"
    >
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover bg-background"
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

        {/* Typography overlay — only after client mount + video ready (avoids hydration mismatch) */}
        {mounted && ready && (
          <>
            {/* Massive chapter words — staggered through scroll */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center mix-blend-difference">
              <motion.div style={{ x: bigX, scale: bigScale }} className="relative w-full h-full">
                {chapters.map((chapter, i) => (
                  <ChapterWord key={chapter.title} chapter={chapter} index={i} total={chapters.length} sp={sp} />
                ))}
              </motion.div>
            </div>


            {/* TOP-LEFT brand */}
            <motion.div
              style={{ opacity: topOp }}
              className="pointer-events-none absolute top-6 left-6 md:top-10 md:left-12 z-20 mix-blend-difference"
            >
              <div className="font-serif italic text-white text-base md:text-lg tracking-[0.35em] uppercase">
                Caelric
              </div>
              <div className="mt-2 h-px w-10 bg-white/60" />
            </motion.div>

            {/* TOP-RIGHT meta */}
            <motion.div
              style={{ opacity: topOp }}
              className="pointer-events-none absolute top-6 right-6 md:top-10 md:right-12 z-20 text-right mix-blend-difference"
            >
              <div className="font-serif text-white text-[10px] md:text-[11px] tracking-[0.45em] uppercase">
                Campaign — Film N°01
              </div>
            </motion.div>

            {/* BOTTOM-LEFT caption */}
            <motion.div
              style={{ opacity: bottomOp }}
              className="pointer-events-none absolute bottom-8 left-6 md:bottom-10 md:left-12 z-20 mix-blend-difference"
            >
              <div className="font-serif italic text-white text-[10px] md:text-[11px] tracking-[0.4em] uppercase">
                A Study in Form
              </div>
            </motion.div>

            {/* BOTTOM-RIGHT counter */}
            <motion.div
              style={{ opacity: bottomOp }}
              className="pointer-events-none absolute bottom-8 right-6 md:bottom-10 md:right-12 z-20 text-right mix-blend-difference"
            >
              <div className="font-serif text-white text-[10px] md:text-[11px] tracking-[0.4em] uppercase tabular-nums">
                Look · <motion.span>{lookText}</motion.span> / 05
              </div>
            </motion.div>
          </>
        )}

        {/* Preload screen */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-30">
            <div className="flex flex-col items-center gap-6">
              <div className="font-serif italic text-foreground text-2xl tracking-[0.3em] uppercase">
                Caelric
              </div>
              <div className="h-px w-48 bg-border overflow-hidden">
                <div
                  className="h-full bg-foreground transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[10px] tracking-luxe uppercase text-muted-foreground tabular-nums">
                {pct}%
              </div>
            </div>
          </div>
        )}
        {ready && children}
      </div>
    </section>
  );
});
