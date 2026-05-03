import { useParams, useNavigate } from "react-router-dom";
import { ProductDetail } from "@/components/ProductDetail";
import type { ProductDetailData } from "@/components/ProductDetail";

import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

/* Full product catalogue — images reused across detail views */
const catalogue: ProductDetailData[] = [
  {
    id: "atelier-overcoat",
    name: "Atelier Overcoat",
    category: "Outerwear · Ivory Silk",
    price: "€ 2,480",
    image: p1,
    look: "Look 01",
    description:
      "A sculptural overcoat in ivory silk-wool. Cut with a relaxed, column silhouette and a notched lapel that falls naturally open. Unlined through the body for supreme drape.",
    composition: "62% Wool, 38% Silk. Lining: 100% Silk.",
    origin: "Woven in Biella, Italy. Finished by hand in our Florence atelier.",
    care: "Dry clean only. Store on a wide-shoulder hanger. Steam to refresh.",
    extraImages: [p2, p3],
  },
  {
    id: "spiga-blazer",
    name: "Spiga Blazer",
    category: "Tailoring · Charcoal Wool",
    price: "€ 1,890",
    image: p2,
    look: "Look 02",
    description:
      "A one-button blazer in deep charcoal wool-cashmere. The chest is shaped using traditional canvassing; no fusing. The result is a jacket that molds quietly to the body over time.",
    composition: "90% Wool, 10% Cashmere. Lining: 100% Silk.",
    origin: "Milled in Prato, Italy. Hand-tailored in Milan.",
    care: "Dry clean only. Press on reverse with damp cloth under steam.",
    extraImages: [p3, p4],
  },
  {
    id: "pleated-trouser",
    name: "Pleated Trouser N°7",
    category: "Trouser · Sand",
    price: "€ 720",
    image: p3,
    look: "Look 03",
    description:
      "Double-pleated trousers in sand-coloured fine gabardine. A high rise, a generous leg, a clean break at the shoe. A trouser for walking through a piazza without hurry.",
    composition: "100% Wool Gabardine.",
    origin: "Fabric woven in Biella. Cut and sewn in Florence.",
    care: "Dry clean preferred. Hand wash cold with gentle detergent.",
    extraImages: [p4, p5],
  },
  {
    id: "cashmere-veil",
    name: "Cashmere Veil",
    category: "Knitwear · Cream",
    price: "€ 1,140",
    image: p4,
    look: "Look 04",
    description:
      "A bias-cut knit in extra-fine 2-ply cashmere. Worn as a wrap, a scarf, or a half-shoulder cape. There are no rules, only weight and warmth.",
    composition: "100% Grade-A Mongolian Cashmere, 2-ply.",
    origin: "Knitted in Scotland. Finished and inspected in Paris.",
    care: "Hand wash in cold water. Dry flat on a white towel in shade.",
    extraImages: [p5, p6],
  },
  {
    id: "slip-dress-onyx",
    name: "Slip Dress · Onyx",
    category: "Eveningwear · Silk",
    price: "€ 1,560",
    image: p5,
    look: "Look 05",
    description:
      "A floor-length slip dress in 30mm charmeuse. The straps are adjustable. The bias cut moves with breath. Worn alone or under the Atelier Overcoat.",
    composition: "100% Mulberry Silk Charmeuse, 30 momme.",
    origin: "Fabric woven in Como, Italy. Sewn by hand in our Milan studio.",
    care: "Dry clean only. Iron on lowest silk setting, inside out.",
    extraImages: [p6, p1],
  },
  {
    id: "architect-trench",
    name: "Architect Trench",
    category: "Outerwear · Ivory",
    price: "€ 2,180",
    image: p6,
    look: "Look 06",
    description:
      "A deconstructed trench in ivory cotton-gabardine. The belt is optional; the structure stands on its own. Storm flap at the back, single welt pockets, clean sleeve.",
    composition: "73% Cotton, 27% Polyester Gabardine. Lining: 100% Viscose.",
    origin: "Fabric woven in Manchester, UK. Finished in Florence, Italy.",
    care: "Machine wash cold on delicate cycle. Hang to dry immediately.",
    extraImages: [p1, p2],
  },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = catalogue.find((p) => p.id === id) ?? catalogue[0];

  return (
    <ProductDetail
      product={product}
      onBack={() => navigate("/")}
    />
  );
}
