import { motion } from "framer-motion";

export function FinalHero() {
  return (
    <section
      id="about"
      className="relative bg-background py-32 md:py-44 border-t border-border"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-8">
            CAELRIC · House N°01
          </div>
          <h1 className="font-serif font-light text-foreground text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.02em]">
            Experience the<br />
            <span className="italic">Future of Fabric.</span>
          </h1>
          <p className="mx-auto mt-10 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
            A house dedicated to the quiet revolution of fabric — where every fold,
            every gesture, every silhouette is composed with the patience of
            an art form.
          </p>
          <div className="mt-14 flex items-center justify-center gap-6 flex-wrap">
            <a
              href="#products"
              className="btn-outline-fill inline-flex items-center justify-center border border-foreground px-10 py-4 text-[11px] tracking-luxe uppercase text-foreground"
            >
              Explore Collection
            </a>
            <a
              href="#"
              className="text-[11px] tracking-luxe uppercase underline-grow text-foreground/80"
            >
              Visit the Atelier
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
