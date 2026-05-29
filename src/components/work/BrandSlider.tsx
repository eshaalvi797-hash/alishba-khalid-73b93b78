import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Slide } from "@/content/work";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BrandSlider({ slides, title }: { slides: Slide[]; title: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = slides.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setState([(next + count) % count, direction]);
    },
    [count],
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1, 1), [go, index]);

  // Gentle autoplay; pauses on hover via the container handlers below.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1, 1), 5000);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const current = slides[index];

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div className="relative aspect-video w-full overflow-hidden bg-paper-2">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={index}
            src={current.src}
            alt={`${title} — ${current.caption}`}
            custom={dir}
            initial={{ x: dir > 0 ? "100%" : "-100%", opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir > 0 ? "-100%" : "100%", opacity: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </AnimatePresence>

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          data-cursor="hover"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-ink/20 bg-paper/70 px-3 py-4 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper md:left-5"
        >
          &larr;
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          data-cursor="hover"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-ink/20 bg-paper/70 px-3 py-4 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper md:right-5"
        >
          &rarr;
        </button>

        {/* Caption + counter */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-4 md:p-6">
          <span className="bg-paper/80 px-3 py-1 font-italic-display text-sm text-ink backdrop-blur-sm md:text-base">
            {current.caption}
          </span>
          <span className="label-caps bg-paper/80 px-3 py-1 text-ink-soft backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="mt-4 grid grid-cols-6 gap-2 md:gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i, i > index ? 1 : -1)}
            data-cursor="hover"
            className={`relative aspect-video overflow-hidden bg-paper-2 transition-opacity duration-300 ${
              i === index ? "opacity-100 ring-1 ring-ink" : "opacity-50 hover:opacity-90"
            }`}
          >
            <img src={s.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
