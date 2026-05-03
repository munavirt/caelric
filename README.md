# CAELRIC - Frontend Only (React + Vite)

A clean, production-ready **React + Vite** frontend application for the CAELRIC luxury fashion brand.

## 🚀 Quick Start

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```
The app will start at `http://localhost:5173`

### Build
```bash
pnpm run build
```
Outputs to `dist/` directory - ready for deployment

### Preview Production Build
```bash
pnpm run preview
```

---

## 📁 Project Structure

```
client/
├── public/
│   ├── sequence/          # Video frames for scroll animation
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ScrollSequenceCanvas.tsx
│   │   ├── FinalHero.tsx
│   │   ├── ScrollText.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ui/             # Radix UI components
│   ├── pages/
│   │   ├── Home.tsx        # / route
│   │   ├── Cart.tsx        # /cart route
│   │   ├── Checkout.tsx    # /checkout route
│   │   ├── Success.tsx     # /success route
│   │   ├── ProductPage.tsx # /product/:id route
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/
│   │   ├── use-lenis.ts    # Smooth scrolling
│   │   ├── use-mobile.tsx  # Mobile detection
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts        # cn() utility
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── assets/             # Product images
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles
│   └── const.ts            # Constants
└── index.html
```

---

## 🔄 Routing

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home.tsx` | Homepage with hero, scroll sequence, products |
| `/product/:id` | `ProductPage.tsx` | Product detail page |
| `/cart` | `Cart.tsx` | Shopping cart |
| `/checkout` | `Checkout.tsx` | Checkout form |
| `/success` | `Success.tsx` | Order confirmation |
| `*` | `NotFound.tsx` | 404 page |

---

## 📦 Tech Stack

- **React** 19.2.1
- **Vite** 7.1.7 - Lightning-fast build tool
- **TypeScript** 5.6.3
- **React Router DOM** 7.14.2 - Client-side routing
- **Tailwind CSS** 4.1.14 - Styling
- **Framer Motion** 12.23.22 - Animations
- **Radix UI** - Accessible component primitives
- **Lenis** 1.3.23 - Smooth scrolling
- **React Hook Form** 7.64.0 - Form handling
- **Zod** 4.1.12 - Schema validation
- **Sonner** 2.0.7 - Toast notifications

---

## 🎨 Design Features

✅ **Luxury Typography** - Cormorant Garamond serif + Inter sans  
✅ **Smooth Scrolling** - Lenis integration  
✅ **Scroll Animations** - ScrollSequenceCanvas with video playback  
✅ **Responsive Design** - Mobile, tablet, desktop  
✅ **Dark Mode Ready** - Theme context support  
✅ **Framer Motion** - Entrance/exit animations  
✅ **Accessible** - Radix UI components  

---

## 🛠️ Scripts

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run check        # TypeScript type check
pnpm run format       # Format code with Prettier
```

---

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### Any Static Host
```bash
pnpm run build
# Upload the `dist/` folder
```

---

## 📝 Environment Variables

Currently no environment variables required. Add to `.env.local` if needed:

```
VITE_API_URL=https://api.example.com
```

---

## 🎯 Product Catalog

The app includes 6 luxury fashion items:

1. **Atelier Overcoat** - €2,480
2. **Spiga Blazer** - €1,890
3. **Pleated Trouser N°7** - €720
4. **Cashmere Veil** - €1,140
5. **Slip Dress · Onyx** - €1,560
6. **Architect Trench** - €2,180

Each product has:
- High-quality images
- Detailed description
- Composition information
- Care instructions
- Product detail page

---

## 🎨 Color System (OKLCH)

```
Background:     oklch(0.995 0 0)      # Near white
Foreground:     oklch(0.16 0.005 270) # Dark blue-gray
Secondary:      oklch(0.96 0.003 270) # Light gray
Accent:         oklch(0.94 0.005 80)  # Golden
```

---

## 🔧 Configuration

### Vite Config (`vite.config.ts`)
- React plugin enabled
- Tailwind CSS support
- Path alias: `@/*` → `./src/*`

### TypeScript (`tsconfig.json`)
- Target: ES2022
- JSX: react-jsx
- Strict mode enabled

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🐛 Troubleshooting

### Port already in use
```bash
pnpm run dev -- --port 3000
```

### Clear cache
```bash
rm -rf node_modules/.vite
pnpm run dev
```

### TypeScript errors
```bash
pnpm run check
```

---

## 📄 License

MIT

---

## 🎉 Ready to Go!

Your frontend is production-ready. Start developing with:

```bash
pnpm install
pnpm run dev
```

Enjoy! 🚀
