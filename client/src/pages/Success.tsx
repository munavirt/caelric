import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const EASE = [0.7, 0, 0.2, 1] as const;

export default function Success() {
  return (
    <div className="bg-background min-h-screen flex flex-col text-foreground font-sans overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 relative">
        {/* Subtle background abstract element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05]"
        >
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-foreground"></div>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-6 flex justify-center"
          >
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </motion.div>
          
          <motion.div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="font-serif text-5xl md:text-7xl tracking-[-0.02em]"
            >
              Order Confirmed.
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE }}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto">
              Thank you for your purchase. Your order <span className="text-foreground">#CR-8492</span> is currently being processed. You will receive an email with tracking details once your items have shipped.
            </p>

            <Link 
              to="/"
              className="inline-block btn-outline-fill border border-foreground px-12 py-5 text-[11px] tracking-luxe uppercase transition-all"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
