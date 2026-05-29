import zara from "@/assets/posters/zara-handbag.jpg";
import strawberry from "@/assets/posters/strawberry-macaron.jpg";
import levis from "@/assets/posters/levis-shoes.jpg";
import fashion from "@/assets/posters/fashion-clothing.jpg";
import shake from "@/assets/posters/shake.jpg";
import puma from "@/assets/posters/puma-shoes.jpg";

export type Poster = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  src: string;
  alt: string;
};

/**
 * Poster / social-post designs. Images are imported as ES6 modules so they are
 * bundled and fingerprinted at build time — the URLs never expire.
 * Each artwork is a 16:9 (1920×1080) presentation plate.
 */
export const posters: Poster[] = [
  { id: "zara", number: "01", title: "ZARA", category: "Handbag Poster", year: "2025", src: zara, alt: "ZARA canvas & leather handbag poster" },
  { id: "strawberry", number: "02", title: "Strawberry", category: "Macaron Poster", year: "2025", src: strawberry, alt: "Sweet Moments strawberry macaron poster" },
  { id: "levis", number: "03", title: "Levi's", category: "Shoes Poster", year: "2025", src: levis, alt: "Levi's We Fly denim shoes poster" },
  { id: "fashion", number: "04", title: "Fashion", category: "Clothing Poster", year: "2025", src: fashion, alt: "Redefine the Trend fashion clothing poster" },
  { id: "shake", number: "05", title: "Shake", category: "Beverage Poster", year: "2025", src: shake, alt: "Real Strawberry Joy shake poster" },
  { id: "puma", number: "06", title: "Puma", category: "Shoes Poster", year: "2025", src: puma, alt: "Puma Built for Impact shoes poster" },
];
