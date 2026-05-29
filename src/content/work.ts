export type WorkPiece = {
  slug: string;
  number: string;
  title: string;
  client?: string;
  year: string;
  discipline: string;
  brief: string;
  description: string;
  cover: {
    src?: string;
    alt: string;
    aspect: "4/5" | "3/2" | "1/1" | "16/9";
  };
  gallery: Array<{
    src?: string;
    alt: string;
    aspect: "4/5" | "3/2" | "1/1" | "16/9";
    fullBleed?: boolean;
    caption?: string;
  }>;
  featured?: boolean;
};

// Placeholder pieces — replace `src` fields when real assets arrive.
// Each entry's structure stays identical; only image URLs swap in.
export const work: WorkPiece[] = [
  {
    slug: "noir-atelier",
    number: "01",
    title: "Noir Atelier",
    client: "Independent fashion label",
    year: "2025",
    discipline: "Brand Identity",
    brief: "A monochrome identity for a Karachi-based ready-to-wear label.",
    description:
      "A complete visual identity built on the discipline of black, bone, and a single weight of type. The wordmark draws from couture-label conventions; the system extends to garment tags, lookbook templates, and a stripped-back e-commerce grid.",
    cover: { alt: "Noir Atelier brand identity — wordmark on bone", aspect: "4/5" },
    gallery: [
      { alt: "Logo lockup and clear-space rules", aspect: "3/2", fullBleed: true },
      { alt: "Garment hang-tag mockup", aspect: "4/5", caption: "Stock: 280gsm uncoated, single ink." },
      { alt: "Editorial lookbook spread", aspect: "3/2", fullBleed: true },
    ],
    featured: true,
  },
  {
    slug: "linen-and-line",
    number: "02",
    title: "Linen & Line",
    client: "Textile capsule collection",
    year: "2025",
    discipline: "Pattern & Print",
    brief: "Hand-drawn textile patterns translated into a SS25 capsule.",
    description:
      "A collection of repeat patterns drawn from architectural fragments — arched windows, terrazzo, woven shadows — then refined in Illustrator and prepared for screen-print production.",
    cover: { alt: "Linen pattern detail on natural fabric", aspect: "1/1" },
    gallery: [
      { alt: "Pattern repeat — arches", aspect: "1/1" },
      { alt: "Pattern repeat — terrazzo", aspect: "1/1" },
      { alt: "Capsule lookbook still", aspect: "4/5", fullBleed: true },
    ],
    featured: true,
  },
  {
    slug: "house-of-quiet",
    number: "03",
    title: "House of Quiet",
    client: "Lifestyle concept store",
    year: "2024",
    discipline: "Editorial Design",
    brief: "Seasonal catalogue and in-store signage system.",
    description:
      "A 32-page seasonal catalogue typeset in Playfair and Raleway, with a paired signage system using only two ink weights and a strict 12-column grid.",
    cover: { alt: "Catalogue spread on linen surface", aspect: "3/2" },
    gallery: [
      { alt: "Catalogue cover", aspect: "4/5" },
      { alt: "Inside spread — featured product", aspect: "3/2", fullBleed: true },
      { alt: "Store signage prototype", aspect: "4/5" },
    ],
    featured: true,
  },
  {
    slug: "studio-margin",
    number: "04",
    title: "Studio Margin",
    client: "Creative agency",
    year: "2024",
    discipline: "Visual System",
    brief: "Identity, stationery, and digital templates for a small studio.",
    description:
      "Built around the idea of margin as a design tool: an identity where the whitespace carries as much information as the marks. Includes letterhead, invoice templates, and pitch-deck masters.",
    cover: { alt: "Studio Margin stationery flat lay", aspect: "3/2" },
    gallery: [
      { alt: "Letterhead and business cards", aspect: "3/2", fullBleed: true },
      { alt: "Pitch deck cover", aspect: "16/9" },
    ],
  },
];

export const featuredWork = () => work.filter((w) => w.featured).slice(0, 3);
export const findWork = (slug: string) => work.find((w) => w.slug === slug);
