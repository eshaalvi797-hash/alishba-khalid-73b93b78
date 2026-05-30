import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Poster } from "@/content/posters";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PosterGallery({ posters }: { posters: Poster[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (next: number) => setActive(((next % posters.length) + posters.length) % posters.length),
    [posters.length],
  );

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(active + 1);
      if (e.key === "ArrowLeft") show(active - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  const current = active !== null ? posters[active] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {posters.map((p, i) => (
          <motion.figure
            key={p.id}
            layoutId={`poster-${p.id}`}
            className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-20" : ""}`}
            data-cursor="hover"
            onClick={() => show(i)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div className="overflow-hidden">
              <motion.img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="aspect-video w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </motion.div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-4">
              <div>
                <p className="label-caps text-ink-soft">
                  {p.number} &nbsp;/&nbsp; {p.category}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{p.title}</h3>
              </div>
              <p className="label-caps text-ink-soft">{p.year}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* ─── LIGHTBOX ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" />

            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              data-cursor="hover"
              className="absolute right-4 top-4 z-10 border border-paper/30 px-4 py-2 font-display text-sm text-paper transition-colors hover:bg-paper hover:text-ink md:right-8 md:top-8"
            >
              Close &times;
            </button>

            {/* Prev / Next */}
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                show((active ?? 0) - 1);
              }}
              data-cursor="hover"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-paper/30 px-3 py-4 text-paper transition-colors hover:bg-paper hover:text-ink md:left-8"
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                show((active ?? 0) + 1);
              }}
              data-cursor="hover"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-paper/30 px-3 py-4 text-paper transition-colors hover:bg-paper hover:text-ink md:right-8"
            >
              &rarr;
            </button>

            {/* Stage */}
            <motion.figure
              layoutId={`poster-${current.id}`}
              className="relative z-[1] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[80svh] w-full object-contain"
              />
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="label-caps text-paper/60">
                    {current.number} &nbsp;/&nbsp; {current.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-paper md:text-3xl">
                    {current.title}
                  </h3>
                </div>
                <p className="label-caps text-paper/60">{current.year}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
