import celene01 from "@/assets/brands/celene/01.jpg";
import celene02 from "@/assets/brands/celene/02.jpg";
import celene03 from "@/assets/brands/celene/03.jpg";
import celene04 from "@/assets/brands/celene/04.jpg";
import celene05 from "@/assets/brands/celene/05.jpg";
import celene06 from "@/assets/brands/celene/06.jpg";

import fierelle01 from "@/assets/brands/fierelle/01.jpg";
import fierelle02 from "@/assets/brands/fierelle/02.jpg";
import fierelle03 from "@/assets/brands/fierelle/03.jpg";
import fierelle04 from "@/assets/brands/fierelle/04.jpg";
import fierelle05 from "@/assets/brands/fierelle/05.jpg";
import fierelle06 from "@/assets/brands/fierelle/06.jpg";

import aurelia01 from "@/assets/brands/aurelia/01.jpg";
import aurelia02 from "@/assets/brands/aurelia/02.jpg";
import aurelia03 from "@/assets/brands/aurelia/03.jpg";
import aurelia04 from "@/assets/brands/aurelia/04.jpg";
import aurelia05 from "@/assets/brands/aurelia/05.jpg";

export type Slide = {
  src: string;
  caption: string;
  /** banner = wide short plate (≈3.5:1); plate = full 16:9. */
  kind: "plate" | "banner";
};

export type WorkPiece = {
  slug: string;
  number: string;
  title: string;
  client?: string;
  year: string;
  discipline: string;
  brief: string;
  description: string;
  palette: string[];
  cover: string;
  slides: Slide[];
};

/**
 * Full brand identity case studies. Every slide is bundled via ES6 import so
 * the assets are fingerprinted at build time and never expire.
 */
export const work: WorkPiece[] = [
  {
    slug: "celene-skin",
    number: "01",
    title: "Celéne Skin",
    client: "Luxury skincare",
    year: "2025",
    discipline: "Brand Identity",
    brief: "A luminous identity for a botanical luxury skincare house.",
    description:
      "Celéne Skin is built around séléne — the soft glow of moonlight on still water. The system pairs a fine serif wordmark with a single leaf-in-droplet mark, a warm nude palette, and restrained editorial layouts that carry the brand from logo to packaging and product range.",
    palette: ["#f3ece4", "#b89a83", "#8a6f5e", "#2d211c"],
    cover: celene05,
    slides: [
      { src: celene01, caption: "Primary logo", kind: "plate" },
      { src: celene02, caption: "Brand story", kind: "plate" },
      { src: celene03, caption: "Logo — ink variant", kind: "plate" },
      { src: celene04, caption: "Colour palette", kind: "banner" },
      { src: celene05, caption: "Product range & packaging", kind: "plate" },
      { src: celene06, caption: "Closing", kind: "banner" },
    ],
  },
  {
    slug: "fierelle-walk",
    number: "02",
    title: "Fierelle Walk",
    client: "Luxury heel brand",
    year: "2025",
    discipline: "Brand Identity",
    brief: "A proud, fierce identity for a luxury heel label.",
    description:
      "Fierelle Walk — from the French Fière (proud) and Elle (her). The mark fuses a stiletto silhouette with a rising flame, rendered in ink and ember. The system spans logo variants, a confident editorial voice, packaging, and a signature collection narrative built for the woman who owns every room she enters.",
    palette: ["#f3efe9", "#9b1b2e", "#5a1620", "#14110f"],
    cover: fierelle05,
    slides: [
      { src: fierelle01, caption: "Primary logo", kind: "plate" },
      { src: fierelle02, caption: "Brand description", kind: "plate" },
      { src: fierelle03, caption: "Logo — ember variant", kind: "plate" },
      { src: fierelle04, caption: "Colour palette", kind: "banner" },
      { src: fierelle05, caption: "Packaging system", kind: "plate" },
      { src: fierelle06, caption: "Closing", kind: "banner" },
    ],
  },
  {
    slug: "aurelia-jewels",
    number: "03",
    title: "Aurelia",
    client: "Luxury jewelry",
    year: "2025",
    discipline: "Brand Identity",
    brief: "Where light becomes legacy — a luxury jewelry house identity.",
    description:
      "Aurelia is a luxury jewelry brand for the modern woman — rooted in her heritage yet boldly writing her own future. Crafted from 22K gold and ethically sourced gemstones, the system blends tradition with clean contemporary lines. A refined serif wordmark with a diamond accent, a deep plum-and-lavender palette, and a full packaging suite carry three pillars — craftsmanship, timelessness, and identity.",
    palette: ["#e8dce8", "#7a4a6b", "#4a1f3d", "#2d1424"],
    cover: aurelia04,
    slides: [
      { src: aurelia01, caption: "Primary logo", kind: "plate" },
      { src: aurelia02, caption: "Brand story", kind: "plate" },
      { src: aurelia03, caption: "Colour palette", kind: "banner" },
      { src: aurelia04, caption: "Packaging system", kind: "plate" },
      { src: aurelia05, caption: "Closing", kind: "banner" },
    ],
  },
];

export const findWork = (slug: string) => work.find((w) => w.slug === slug);
