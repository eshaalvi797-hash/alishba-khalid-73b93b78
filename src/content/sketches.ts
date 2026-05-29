export type Sketch = {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  year: string;
  // Used for intentional irregular masonry sizing.
  size: "tall" | "wide" | "square" | "portrait";
};

// Placeholder sketches — drop `src` urls in when scans are ready.
export const sketches: Sketch[] = [
  { id: "s-01", alt: "Pencil study of draped fabric", caption: "Drape study, morning light", year: "2025", size: "portrait" },
  { id: "s-02", alt: "Botanical line drawing", caption: "Wild fennel, from memory", year: "2025", size: "square" },
  { id: "s-03", alt: "Architectural arch detail", caption: "Arch, MA Jinnah Road", year: "2024", size: "tall" },
  { id: "s-04", alt: "Pattern repeat exploration", caption: "Repeat 04 — terrazzo", year: "2025", size: "wide" },
  { id: "s-05", alt: "Figure gesture sketch", caption: "Gesture, no. 12", year: "2024", size: "portrait" },
  { id: "s-06", alt: "Typographic experiment", caption: "Letterform — A, italic", year: "2025", size: "square" },
];
