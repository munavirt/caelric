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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen, searchOpen]);

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
    <>
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
            <button
              onClick={() => setSearchOpen(true)}
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
          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-foreground hover:opacity-70 transition-opacity flex items-center"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
            </svg>
          </button>
        </div>
      </nav>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col px-6 py-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[13px] tracking-luxe font-medium uppercase"
              >
                C A E L R I C
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-12">
              {links.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl font-serif text-foreground uppercase tracking-widest"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center px-6 md:px-12"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-6 md:right-12 text-foreground hover:opacity-70 transition-opacity p-2 -mr-2"
              aria-label="Close search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.7, 0, 0.2, 1] }}
              className="w-full max-w-3xl relative"
              onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); }}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search the collection..."
                className="w-full bg-transparent border-b border-foreground/30 pb-4 text-2xl md:text-5xl font-serif font-light text-foreground focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/30"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-6 text-[10px] tracking-luxe uppercase text-foreground hover:opacity-70 transition-opacity hidden md:block"
              >
                Enter
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
