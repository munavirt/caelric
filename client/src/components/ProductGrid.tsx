import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

const products = [
  { id: "atelier-overcoat",   name: "Atelier Overcoat",    category: "Outerwear · Ivory Silk",    price: "€ 2,480", image: p1 },
  { id: "spiga-blazer",       name: "Spiga Blazer",        category: "Tailoring · Charcoal Wool", price: "€ 1,890", image: p2 },
  { id: "pleated-trouser",    name: "Pleated Trouser N°7", category: "Trouser · Sand",            price: "€ 720",   image: p3 },
  { id: "cashmere-veil",      name: "Cashmere Veil",       category: "Knitwear · Cream",          price: "€ 1,140", image: p4 },
  { id: "slip-dress-onyx",    name: "Slip Dress · Onyx",   category: "Eveningwear · Silk",        price: "€ 1,560", image: p5 },
  { id: "architect-trench",   name: "Architect Trench",    category: "Outerwear · Ivory",         price: "€ 2,180", image: p6 },
];

export function ProductGrid() {
  return (
    <section id="products" className="bg-background py-32 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <div className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-4">
              The Collection · FW MMXXV
            </div>
            <h2 className="font-serif font-light text-foreground text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.01em]">
              Quiet Pieces,<br />Loud Presence.
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-block text-[11px] tracking-luxe uppercase underline-grow"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.7, 0, 0.2, 1] }}
            >
              <Link
                to={`/product/${p.id}`}
                className="group block no-underline"
              >
                <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 ring-0 ring-foreground/0 transition-shadow duration-700 group-hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]" />
                  {/* hover CTA overlay */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] bg-background/90 backdrop-blur-sm py-4 px-5">
                    <span className="text-[10px] tracking-luxe uppercase text-foreground">View Details</span>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <div>
                    <div className="font-serif text-xl text-foreground">{p.name}</div>
                    <div className="mt-1 text-[10px] tracking-luxe uppercase text-muted-foreground">
                      {p.category}
                    </div>
                  </div>
                  <div className="text-sm tabular-nums text-foreground/80">{p.price}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
