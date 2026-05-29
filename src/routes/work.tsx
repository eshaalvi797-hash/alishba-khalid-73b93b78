import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { work } from "@/content/work";
import { Placeholder } from "@/components/ui/Placeholder";
import { RevealText } from "@/components/ui/RevealText";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Alishba Khalid" },
      {
        name: "description",
        content:
          "An index of selected graphic design work — brand identities, editorial design, and pattern systems for fashion and lifestyle brands.",
      },
      { property: "og:title", content: "Work — Alishba Khalid" },
      {
        property: "og:description",
        content:
          "Selected graphic design work — brand identities, editorial design, and pattern systems.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = work.find((w) => w.slug === hovered) ?? work[0];

  return (
    <section className="bg-paper pt-32 md:pt-40">
      <div className="editorial-container">
        <div className="border-b border-ink/15 pb-10 md:pb-16">
          <RevealText as="p" className="label-caps text-ink-soft">
            Index &mdash; 2024 &ndash; 2025
          </RevealText>
          <RevealText
            as="h1"
            delay={0.1}
            className="mt-6 font-italic-display text-5xl leading-[0.95] text-ink md:text-7xl lg:text-8xl"
          >
            Selected
            <br />
            <span className="font-display not-italic font-bold">Work.</span>
          </RevealText>
        </div>

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16">
          {/* The numbered index — left column on desktop */}
          <ol className="md:col-span-7">
            {work.map((piece) => (
              <li
                key={piece.slug}
                className="group border-b border-ink/10"
                onMouseEnter={() => setHovered(piece.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  to="/work/$slug"
                  params={{ slug: piece.slug }}
                  className="grid grid-cols-12 items-baseline gap-4 py-6 transition-colors md:py-10"
                  data-cursor="hover"
                >
                  <span className="col-span-2 font-display text-xl text-ink-soft md:text-2xl">
                    {piece.number}
                  </span>
                  <div className="col-span-7 md:col-span-7">
                    <h2 className="font-display text-2xl text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                      {piece.title}
                    </h2>
                    <p className="mt-2 label-caps text-ink-soft md:hidden">
                      {piece.discipline}
                    </p>
                  </div>
                  <p className="col-span-3 hidden label-caps text-ink-soft md:block">
                    {piece.discipline}
                  </p>
                </Link>
              </li>
            ))}
          </ol>

          {/* Sticky preview — right column on desktop */}
          <aside className="hidden md:col-span-5 md:block">
            <div className="sticky top-32">
              <div className="transition-opacity duration-500">
                <Placeholder
                  src={active.cover.src}
                  alt={active.cover.alt}
                  aspect={active.cover.aspect}
                  label={active.title}
                />
                <p className="mt-4 font-italic-display text-lg text-ink-soft">
                  {active.brief}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
