import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sketches, type Sketch } from "@/content/sketches";
import { Placeholder } from "@/components/ui/Placeholder";
import { RevealText } from "@/components/ui/RevealText";

export const Route = createFileRoute("/sketch")({
  head: () => ({
    meta: [
      { title: "Sketchbook — Alishba Khalid" },
      {
        name: "description",
        content:
          "Hand sketches, gesture studies, and pattern experiments — the analogue thinking behind the digital work.",
      },
      { property: "og:title", content: "Sketchbook — Alishba Khalid" },
      {
        property: "og:description",
        content: "Hand sketches and pattern experiments from the studio.",
      },
    ],
  }),
  component: SketchPage,
});

const sizeMap = {
  tall: "row-span-2 aspect-[3/5]",
  wide: "col-span-2 aspect-[3/2]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
} as const;

const aspectFor = (size: Sketch["size"]) =>
  size === "wide" ? "3/2" : size === "portrait" ? "4/5" : size === "tall" ? "9/16" : "1/1";

function SketchPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + sketches.length) % sketches.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % sketches.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, prev, next]);

  return (
    <section className="bg-paper pt-32 md:pt-40">
      <div className="editorial-container">
        <div className="border-b border-ink/15 pb-10 md:pb-16">
          <RevealText as="p" className="label-caps text-ink-soft">
            Sketchbook &mdash; the analogue side
          </RevealText>
          <RevealText
            as="h1"
            delay={0.1}
            className="mt-6 font-italic-display text-5xl leading-[0.95] text-ink md:text-7xl lg:text-8xl"
          >
            Thinking,
            <br />
            <span className="font-display not-italic font-bold">on paper.</span>
          </RevealText>
          <RevealText
            as="p"
            delay={0.2}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Gesture studies, drape observations, and pattern experiments. The
            slow thinking that precedes everything that becomes a brand.
          </RevealText>
        </div>

        {/* Intentionally irregular masonry-ish grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 py-16 md:grid-cols-4 md:gap-x-8 md:gap-y-20">
          {sketches.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group block text-left ${
                s.size === "tall" ? "md:row-span-2 md:mt-12" : ""
              } ${s.size === "wide" ? "md:col-span-2" : ""} ${i % 3 === 1 ? "md:mt-16" : ""}`}
              data-cursor="hover"
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  <Placeholder
                    src={s.src}
                    alt={s.alt}
                    aspect={aspectFor(s.size)}
                    label={s.caption}
                  />
                </div>
              </div>
              <p className="mt-3 font-italic-display text-sm text-ink md:text-base">
                {s.caption}
              </p>
              <p className="mt-1 label-caps text-ink-soft">{s.year}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/97 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-6 top-6 label-caps text-ink hover:underline"
              data-cursor="hover"
            >
              Close (Esc)
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 label-caps text-ink hover:underline"
              data-cursor="hover"
            >
              &larr; Prev
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 label-caps text-ink hover:underline"
              data-cursor="hover"
            >
              Next &rarr;
            </button>

            <motion.figure
              key={sketches[openIndex].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[80vh] max-w-[80vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] w-auto">
                <Placeholder
                  src={sketches[openIndex].src}
                  alt={sketches[openIndex].alt}
                  aspect={aspectFor(sketches[openIndex].size)}
                  label={sketches[openIndex].caption}
                  className="max-h-[70vh] w-auto"
                />
              </div>
              <figcaption className="mt-4 text-center font-italic-display text-lg text-ink">
                {sketches[openIndex].caption}
                <span className="ml-3 label-caps text-ink-soft">
                  {sketches[openIndex].year}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
