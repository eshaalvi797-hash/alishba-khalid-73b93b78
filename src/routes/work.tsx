import { createFileRoute, Link } from "@tanstack/react-router";
import { work } from "@/content/work";
import { BrandSlider } from "@/components/work/BrandSlider";
import { RevealText } from "@/components/ui/RevealText";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Alishba Khalid" },
      {
        name: "description",
        content:
          "Full brand identity case studies — Celéne Skin and Fierelle Walk. Logos, palettes, packaging, and editorial systems for luxury fashion and lifestyle brands.",
      },
      { property: "og:title", content: "Work — Alishba Khalid" },
      {
        property: "og:description",
        content: "Full brand identity case studies for luxury fashion and lifestyle brands.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <section className="bg-paper pt-32 md:pt-40">
      <div className="editorial-container">
        <div className="border-b border-ink/15 pb-10 md:pb-16">
          <RevealText as="p" className="label-caps text-ink-soft">
            Brand Identity &mdash; 2025
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
          <RevealText as="p" delay={0.2} className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Two full brand systems, slide by slide — from logo to palette to packaging.
          </RevealText>
        </div>

        <div className="space-y-28 py-20 md:space-y-40 md:py-28">
          {work.map((piece) => (
            <article key={piece.slug} id={piece.slug} className="scroll-mt-32">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
                <div>
                  <p className="label-caps text-ink-soft">
                    {piece.number} &nbsp;/&nbsp; {piece.discipline}
                  </p>
                  <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">{piece.title}</h2>
                  <p className="mt-3 max-w-xl font-italic-display text-lg text-ink-soft md:text-xl">
                    {piece.brief}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {piece.palette.map((c) => (
                      <span
                        key={c}
                        className="h-6 w-6 rounded-full border border-ink/10"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <Link
                    to="/work/$slug"
                    params={{ slug: piece.slug }}
                    className="label-caps text-ink underline-offset-4 hover:underline"
                    data-cursor="hover"
                  >
                    Full case &rarr;
                  </Link>
                </div>
              </div>

              <BrandSlider slides={piece.slides} title={piece.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
