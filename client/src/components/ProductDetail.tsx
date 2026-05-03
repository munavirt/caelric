import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ─── shared easing ─── */
const EASE = [0.7, 0, 0.2, 1] as const;

/* ─── stagger children ─── */
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/* ─── text reveal (mask slide-up) ─── */
function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── thin divider ─── */
function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px w-full bg-border"
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}

/* ─── size selector ─── */
const SIZES = ["XS", "S", "M", "L", "XL"];

/* ─── product data (mirrors ProductGrid) ─── */
export interface ProductDetailData {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  composition: string;
  origin: string;
  care: string;
  look: string;
  extraImages: string[];
}

interface Props {
  product: ProductDetailData;
  onBack?: () => void;
}

export function ProductDetail({ product, onBack }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const imageColRef = useRef<HTMLDivElement>(null);

  /* parallax on hero image */
  const { scrollYProgress } = useScroll({
    target: imageColRef as React.RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  /* add to bag flash */
  const handleAdd = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  /* lock body scroll on mobile when gallery overlay open */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const allImages = [product.image, ...product.extraImages];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Back breadcrumb ── */}
      <motion.div
        className="mx-auto max-w-[1600px] px-6 md:px-12 pt-28 pb-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <span className="h-px w-8 bg-muted-foreground group-hover:w-12 transition-all duration-500" />
          Collection
        </button>
      </motion.div>

      {/* ── Main two-col layout ── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 pt-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-16 xl:gap-24">

          {/* ── LEFT: image column ── */}
          <div ref={imageColRef} className="relative">
            {/* Primary image with parallax */}
            <div className="relative overflow-hidden bg-secondary aspect-[4/5] w-full">
              <motion.img
                key={activeImg}
                src={allImages[activeImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ y: imgY }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              {/* vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />

              {/* look counter */}
              <div className="absolute bottom-6 right-6 text-[10px] tracking-luxe uppercase text-white/70 font-serif tabular-nums">
                {String(activeImg + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnails strip */}
            {allImages.length > 1 && (
              <div className="mt-3 flex gap-2">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative overflow-hidden flex-1 aspect-[4/5] bg-secondary transition-all duration-500 ${
                      activeImg === i ? "ring-1 ring-foreground" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Scrolling secondary editorial image */}
            {product.extraImages[1] && (
              <div className="mt-6 overflow-hidden bg-secondary aspect-[3/4] w-full">
                <motion.img
                  src={product.extraImages[1]}
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, ease: EASE }}
                />
              </div>
            )}
          </div>

          {/* ── RIGHT: sticky detail column ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-0"
            >
              {/* Label */}
              <motion.div
                variants={itemVariants}
                className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-6"
              >
                {product.look} · FW MMXXV
              </motion.div>

              {/* Product name — masked reveal */}
              <div className="mb-2">
                <RevealLine delay={0.1} className="font-serif font-light text-foreground text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.0] tracking-[-0.02em]">
                  {product.name}
                </RevealLine>
              </div>

              {/* Category */}
              <motion.div
                variants={itemVariants}
                className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-8"
              >
                {product.category}
              </motion.div>

              <Divider delay={0.3} />

              {/* Price */}
              <motion.div
                variants={itemVariants}
                className="py-7 font-sans font-light tracking-wide text-2xl text-foreground tabular-nums"
              >
                {product.price}
              </motion.div>

              <Divider delay={0.35} />

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="py-7 text-sm leading-[1.8] text-muted-foreground max-w-[38ch]"
              >
                {product.description}
              </motion.p>

              <Divider delay={0.4} />

              {/* Size selector */}
              <motion.div variants={itemVariants} className="py-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-luxe uppercase">Select Size</span>
                  <button className="text-[10px] tracking-luxe uppercase underline-grow text-muted-foreground">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 w-11 border text-[11px] tracking-luxe-tight uppercase transition-all duration-300 ${
                        selectedSize === sz
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground/60 border-border hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <button
                  id="add-to-bag"
                  onClick={handleAdd}
                  disabled={!selectedSize}
                  className={`btn-outline-fill relative w-full border border-foreground py-5 text-[11px] tracking-luxe uppercase transition-all duration-500 ${
                    !selectedSize ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="block"
                      >
                        Added to Bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="block"
                      >
                        Add to Bag
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button className="w-full border border-border py-5 text-[11px] tracking-luxe uppercase text-foreground/60 hover:text-foreground hover:border-foreground transition-all duration-300">
                  Save to Wishlist
                </button>
              </motion.div>

              {/* Specs accordion-style rows */}
              <motion.div variants={itemVariants} className="mt-10 space-y-0">
                {[
                  { label: "Composition", value: product.composition },
                  { label: "Origin", value: product.origin },
                  { label: "Care", value: product.care },
                ].map(({ label, value }, i) => (
                  <SpecRow key={label} label={label} value={value} delay={0.55 + i * 0.06} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Editorial strip ── */}
        <EditorialStrip product={product} />

        {/* ── Reviews ── */}
        <ReviewSection />
      </div>

      <Footer />
    </div>
  );
}

/* ── Spec row with animated reveal ── */
function SpecRow({ label, value, delay }: { label: string; value: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-[10px] tracking-luxe uppercase text-foreground hover:text-muted-foreground transition-colors duration-300"
      >
        {label}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-lg leading-none text-muted-foreground"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{value}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Bottom editorial strip ── */
function EditorialStrip({ product }: { product: ProductDetailData }) {
  return (
    <section className="mt-32 border-t border-border pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="text-center mb-20"
      >
        <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-6">
          The Making
        </div>
        <h2 className="font-serif font-light text-foreground text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
          Crafted in{" "}
          <span className="italic">Florence.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Material",
            body: "Every fabric is sourced from generational mills in Northern Italy, selected for hand, drape, and silence.",
            num: "01",
          },
          {
            label: "Construction",
            body: "Pattern pieces are cut by hand. Each seam is pressed individually. Nothing is rushed.",
            num: "02",
          },
          {
            label: "Finish",
            body: "Hand-finished hems, mother-of-pearl buttons, and a signature interior label sewn in Milan.",
            num: "03",
          },
        ].map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
            className="border-t border-border pt-8"
          >
            <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-6">
              {item.num}
            </div>
            <div className="font-serif text-xl text-foreground mb-4">{item.label}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   REVIEW SECTION
═══════════════════════════════════════════════ */

const REVIEWS = [
  {
    id: 1,
    author: "Isabelle M.",
    location: "Paris, France",
    rating: 5,
    date: "April 2025",
    title: "Wears like a second skin.",
    body: "I have owned many luxury coats, but this one is genuinely different. The weight is perfect — substantial enough to feel real, light enough to forget you are wearing it. The drape is exactly as photographed.",
    verified: true,
    size: "S · Fits true to size",
  },
  {
    id: 2,
    author: "Nikolai B.",
    location: "Copenhagen, Denmark",
    rating: 5,
    date: "March 2025",
    title: "Worth every euro.",
    body: "Exceptional construction. You can feel the hand-finishing immediately — the way the lapel lies flat, the quiet confidence of the fabric. It arrived beautifully packaged. CAELRIC is the real thing.",
    verified: true,
    size: "M · Sized up",
  },
  {
    id: 3,
    author: "Yuki T.",
    location: "Tokyo, Japan",
    rating: 4,
    date: "February 2025",
    title: "Stunning — almost perfect.",
    body: "The coat is breathtaking in person. The only reason I did not give five stars is the delivery took slightly longer than estimated. But the garment itself? Flawless. The ivory is warmer than on screen — which I actually prefer.",
    verified: true,
    size: "XS · Fits slightly large",
  },
];

const RATING_DIST = [
  { stars: 5, count: 38 },
  { stars: 4, count: 8 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];
const TOTAL_REVIEWS = RATING_DIST.reduce((s, r) => s + r.count, 0);
const AVG_RATING = (
  RATING_DIST.reduce((s, r) => s + r.stars * r.count, 0) / TOTAL_REVIEWS
).toFixed(1);

/* ── Luxury star glyph ── */
function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 12 12"
          fill={n <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.2}
          className={n <= rating ? "text-foreground" : "text-border"}
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

/* ── Single review card ── */
function ReviewCard({ review, index }: { review: (typeof REVIEWS)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay: index * 0.1, ease: EASE }}
      className="border-t border-border pt-10 pb-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12"
    >
      {/* Left meta */}
      <div className="flex flex-col gap-3">
        <Stars rating={review.rating} size={11} />
        <div className="font-serif text-base text-foreground">{review.author}</div>
        <div className="text-[10px] tracking-luxe uppercase text-muted-foreground leading-relaxed">
          {review.location}
          <br />
          {review.date}
        </div>
        {review.verified && (
          <div className="inline-flex items-center gap-1.5 text-[9px] tracking-luxe uppercase text-muted-foreground">
            <span className="h-px w-4 bg-muted-foreground" />
            Verified Purchase
          </div>
        )}
        <div className="mt-1 text-[10px] tracking-luxe uppercase text-muted-foreground/70">
          {review.size}
        </div>
      </div>

      {/* Right body */}
      <div>
        <div className="font-serif italic text-xl text-foreground mb-4 leading-snug">
          &ldquo;{review.title}&rdquo;
        </div>
        <p className="text-sm text-muted-foreground leading-[1.9] max-w-[60ch]">{review.body}</p>
      </div>
    </motion.article>
  );
}

/* ── Write a review slide-in form ── */
function WriteReviewForm({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: EASE }}
      className="border border-border p-8 md:p-12 mt-8"
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="font-serif italic text-2xl text-foreground mb-3">
            Thank you.
          </div>
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground">
            Your review has been submitted for approval.
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-[10px] tracking-luxe uppercase">Write a Review</div>
            <button
              type="button"
              onClick={onClose}
              className="text-[10px] tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Cancel
            </button>
          </div>

          {/* Star picker */}
          <div>
            <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-3">
              Your Rating
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(n)}
                  className="p-1 transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 12 12"
                    fill={n <= (hovered || rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={1.1}
                    className={n <= (hovered || rating) ? "text-foreground" : "text-border"}
                  >
                    <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "review-name", label: "Name", type: "text", placeholder: "Isabelle M." },
              { id: "review-location", label: "Location", type: "text", placeholder: "Paris, France" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
                />
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor="review-title"
              className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2"
            >
              Review Title
            </label>
            <input
              id="review-title"
              type="text"
              placeholder="Wears like a second skin."
              required
              className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="review-body"
              className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review-body"
              rows={5}
              placeholder="Tell us about the fit, the fabric, the feeling…"
              required
              className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`btn-outline-fill w-full border border-foreground py-5 text-[11px] tracking-luxe uppercase transition-all duration-500 ${
              rating === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            Submit Review
          </button>
        </form>
      )}
    </motion.div>
  );
}

/* ── Main Review Section ── */
function ReviewSection() {
  const [showForm, setShowForm] = useState(false);
  const maxCount = Math.max(...RATING_DIST.map((r) => r.count));

  return (
    <section className="mt-32 border-t border-border pt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
      >
        <div>
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-6">
            Client Reviews · {TOTAL_REVIEWS} Voices
          </div>
          <div className="flex items-end gap-5">
            <div className="font-serif font-light text-foreground text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-[-0.03em]">
              {AVG_RATING}
            </div>
            <div className="pb-2">
              <Stars rating={Math.round(parseFloat(AVG_RATING))} size={14} />
              <div className="mt-2 text-[10px] tracking-luxe uppercase text-muted-foreground">
                {TOTAL_REVIEWS} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Rating distribution bars */}
        <div className="flex flex-col gap-2 min-w-[220px]">
          {RATING_DIST.map((row, i) => (
            <motion.div
              key={row.stars}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="flex items-center gap-3"
            >
              <div className="text-[10px] tracking-luxe uppercase text-muted-foreground w-4 text-right tabular-nums">
                {row.stars}
              </div>
              <div className="flex-1 h-px bg-border relative overflow-visible">
                <motion.div
                  className="absolute top-[-1px] left-0 h-[2px] bg-foreground"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${maxCount > 0 ? (row.count / maxCount) * 100 : 0}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease: EASE }}
                />
              </div>
              <div className="text-[10px] tabular-nums text-muted-foreground w-5">{row.count}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Review cards */}
      <div>
        {REVIEWS.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* Write review CTA + form */}
      <div className="border-t border-border pt-12 mt-4">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <div className="font-serif italic text-xl text-foreground mb-2">
                  Share your experience.
                </div>
                <div className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                  Your words help others decide with confidence.
                </div>
              </div>
              <button
                id="write-review"
                onClick={() => setShowForm(true)}
                className="btn-outline-fill shrink-0 border border-foreground px-10 py-4 text-[11px] tracking-luxe uppercase"
              >
                Write a Review
              </button>
            </motion.div>
          ) : (
            <motion.div key="form">
              <WriteReviewForm onClose={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
