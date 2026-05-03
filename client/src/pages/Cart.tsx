import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const EASE = [0.7, 0, 0.2, 1] as const;

const MOCK_CART = [
  {
    id: 1,
    name: "The Sculpted Wrap Coat",
    price: 3450,
    color: "Ivory",
    size: "S",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    price: 1200,
    color: "Midnight",
    size: "M",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1550614000-4b95d4665128?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function Cart() {
  const subtotal = MOCK_CART.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-background min-h-screen flex flex-col text-foreground font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-16 tracking-[-0.02em]">Your Bag</h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">
            {/* Cart Items */}
            <div className="flex flex-col gap-10">
              {MOCK_CART.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: EASE }}
                  className="flex gap-6 md:gap-8 pb-10 border-b border-border/50"
                >
                  <div className="w-24 md:w-32 aspect-[3/4] bg-muted overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl md:text-2xl">{item.name}</h3>
                        <span className="text-sm tracking-luxe">€{item.price.toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-1">Color: {item.color}</p>
                      <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center gap-4 border border-border px-3 py-1 text-sm">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">-</button>
                        <span>{item.quantity}</span>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">+</button>
                      </div>
                      <button className="text-[10px] tracking-luxe uppercase underline-grow text-muted-foreground hover:text-foreground">
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="bg-card p-8 md:p-10 border border-border/50 h-fit"
            >
              <h2 className="text-[10px] tracking-luxe uppercase mb-8">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-8 text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-[10px] tracking-luxe uppercase">Calculated at checkout</span>
              </div>
              
              <div className="pt-6 border-t border-border/50 mb-10 flex justify-between items-end">
                <span className="text-[12px] tracking-luxe uppercase">Total</span>
                <span className="font-serif text-3xl">€{subtotal.toLocaleString()}</span>
              </div>

              <Link 
                to="/checkout"
                className="btn-outline-fill w-full border border-foreground py-5 text-[11px] tracking-luxe uppercase text-center block"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
