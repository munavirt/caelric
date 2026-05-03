import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#story" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500 " +
        (scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60"
          : "bg-transparent border-b border-transparent")
      }
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12 py-5 relative">
        <div className="flex-1">
          <Link
            to="/"
            className="text-[13px] tracking-luxe font-medium uppercase"
            aria-label="CAELRIC home"
          >
            C A E L R I C
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="underline-grow text-[11px] tracking-luxe-tight uppercase text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1 flex justify-end items-center gap-5 md:gap-8">
          {/* Search */}
          <div className="relative flex items-center justify-end">
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                  className="absolute right-8 mr-2 overflow-hidden flex items-center"
                  onSubmit={(e) => { e.preventDefault(); /* handle search */ }}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="SEARCH"
                    className="w-full bg-transparent border-b border-foreground/30 pb-1 text-[11px] tracking-luxe-tight uppercase text-foreground focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40"
                    onBlur={() => {
                      if (!searchInputRef.current?.value) {
                        setSearchOpen(false);
                      }
                    }}
                  />
                </motion.form>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Cart */}
          <Link to="/cart" className="text-foreground hover:opacity-70 transition-opacity flex items-center gap-2 no-underline" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="text-[10px] tabular-nums hidden md:inline">0</span>
          </Link>
          
          <a
            href="#products"
            className="md:hidden text-[11px] tracking-luxe-tight uppercase"
          >
            Shop
          </a>
        </div>
      </nav>
    </header>
  );
}
