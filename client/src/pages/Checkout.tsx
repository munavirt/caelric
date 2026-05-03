import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const EASE = [0.7, 0, 0.2, 1] as const;

export default function Checkout() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col text-foreground font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1000px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-16 tracking-[-0.02em]">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
            
            {/* Forms */}
            <div className="flex flex-col gap-16">
              
              {/* Billing Details */}
              <section>
                <h2 className="text-[12px] tracking-luxe uppercase mb-8 pb-4 border-b border-border/50">Billing & Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">First Name</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Last Name</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Email Address</label>
                    <input type="email" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Street Address</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">City</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Postal Code</label>
                    <input type="text" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-[12px] tracking-luxe uppercase mb-8 pb-4 border-b border-border/50">Payment</h2>
                <div className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors font-mono" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">CVC</label>
                      <input type="text" placeholder="123" required className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors font-mono" />
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Summary sidebar */}
            <div>
              <div className="bg-card p-8 border border-border/50 sticky top-32">
                <h3 className="font-serif text-2xl mb-6">Total: €4,650</h3>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  By completing your order, you agree to CAELRIC's Terms of Service and Privacy Policy.
                </p>
                <button 
                  type="submit"
                  className="btn-outline-fill w-full border border-foreground py-5 text-[11px] tracking-luxe uppercase text-center block"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
