export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-[13px] tracking-luxe font-medium uppercase">C A E L R I C</div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A study in fabric, form and quiet motion. Designed in Milan, crafted in Florence.
          </p>
        </div>
        <div>
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground">House</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#story" className="underline-grow">Story</a></li>
            <li><a href="#products" className="underline-grow">Collection</a></li>
            <li><a href="#about" className="underline-grow">Atelier</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-luxe uppercase text-muted-foreground">Contact</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>studio@caelric.com</li>
            <li>Via della Spiga 12, Milano</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-6 flex items-center justify-between text-[10px] tracking-luxe uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} CAELRIC</span>
          <span>Modern Luxury</span>
        </div>
      </div>
    </footer>
  );
}
