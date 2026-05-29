import { createFileRoute, Link } from "@tanstack/react-router";
import { ClothHero } from "@/components/three/ClothHero";
import { RevealText } from "@/components/ui/RevealText";
import { Placeholder } from "@/components/ui/Placeholder";
import { featuredWork } from "@/content/work";
import { sketches } from "@/content/sketches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alishba Khalid — Minimalist Graphic Designer for Fashion" },
      {
        name: "description",
        content:
          "Editorial brand identities and visual systems for fashion, lifestyle, and the brands that prefer silence over noise. Karachi-based, working globally.",
      },
      { property: "og:title", content: "Alishba Khalid — Minimalist Graphic Designer for Fashion" },
      {
        property: "og:description",
        content:
          "Editorial brand identities and visual systems for fashion, lifestyle, and the brands that prefer silence over noise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = featuredWork();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-paper">
        <div className="absolute inset-0">
          <ClothHero />
        </div>

        {/* Soft paper veil over the cloth for type legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/40 via-paper/10 to-paper/60" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="editorial-container flex-1 flex items-center">
            <div className="max-w-4xl">
              <p className="label-caps text-ink-soft editorial-rise">
                Graphic Designer &mdash; Karachi
              </p>
              <h1 className="mt-6 font-italic-display text-[12vw] leading-[0.95] tracking-tight text-ink md:text-[8vw] lg:text-[7rem] editorial-rise" style={{ animationDelay: "0.15s" }}>
                Restraint,
                <br />
                <span className="font-display not-italic font-bold">as a design</span>
                <br />
                language.
              </h1>
            </div>
          </div>

          <div className="editorial-container flex items-end justify-between pb-10">
            <p className="max-w-sm text-sm text-ink-soft md:text-base editorial-rise" style={{ animationDelay: "0.4s" }}>
              Editorial brand identities and visual systems for fashion,
              lifestyle, and the brands that prefer silence over noise.
            </p>
            <p className="label-caps text-ink-soft editorial-rise hidden md:block" style={{ animationDelay: "0.55s" }}>
              Scroll &darr;
            </p>
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ────────────────────────────────────────────────────── */}
      <section className="bg-paper py-32 md:py-48">
        <div className="editorial-container">
          <RevealText
            as="p"
            className="mx-auto max-w-4xl text-center font-italic-display text-2xl leading-snug text-ink md:text-4xl lg:text-5xl"
          >
            &ldquo;I believe a brand earns trust by what it chooses not to say.
            Every mark, every margin, every silence is a decision.&rdquo;
          </RevealText>
          <RevealText
            as="p"
            delay={0.2}
            className="mt-8 text-center label-caps text-ink-soft"
          >
            &mdash; Studio note, 2025
          </RevealText>
        </div>
      </section>

      {/* ─── FEATURED WORK (MAGAZINE SPREAD) ──────────────────────────────── */}
      <section className="bg-paper pb-32 md:pb-48">
        <div className="editorial-container">
          <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-6 md:mb-20">
            <RevealText as="h2" className="font-display text-3xl text-ink md:text-5xl">
              Selected Work
            </RevealText>
            <RevealText as="p" className="label-caps text-ink-soft" delay={0.1}>
              2024 &mdash; 2025
            </RevealText>
          </div>

          {/* Asymmetric magazine spread: one large + two stacked */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12">
            {/* Lead piece */}
            {featured[0] && (
              <Link
                to="/work/$slug"
                params={{ slug: featured[0].slug }}
                className="group block md:col-span-7"
                data-cursor="hover"
              >
                <div className="overflow-hidden">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <Placeholder
                      src={featured[0].cover.src}
                      alt={featured[0].cover.alt}
                      aspect={featured[0].cover.aspect}
                      label={featured[0].title}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <div>
                    <p className="label-caps text-ink-soft">
                      {featured[0].number} &nbsp;/&nbsp; {featured[0].discipline}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                      {featured[0].title}
                    </h3>
                  </div>
                  <p className="label-caps text-ink-soft">{featured[0].year}</p>
                </div>
              </Link>
            )}

            {/* Stacked secondary pieces */}
            <div className="flex flex-col gap-16 md:col-span-5 md:gap-12 md:pt-24">
              {featured.slice(1, 3).map((piece) => (
                <Link
                  key={piece.slug}
                  to="/work/$slug"
                  params={{ slug: piece.slug }}
                  className="group block"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      <Placeholder
                        src={piece.cover.src}
                        alt={piece.cover.alt}
                        aspect={piece.cover.aspect}
                        label={piece.title}
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="label-caps text-ink-soft">
                        {piece.number} &nbsp;/&nbsp; {piece.discipline}
                      </p>
                      <h3 className="mt-2 font-display text-xl text-ink md:text-2xl">
                        {piece.title}
                      </h3>
                    </div>
                    <p className="label-caps text-ink-soft">{piece.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/work"
              className="font-italic-display text-2xl text-ink underline-offset-8 hover:underline md:text-3xl"
              data-cursor="hover"
            >
              View the full index &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper py-32 md:py-48">
        <div className="editorial-container grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Placeholder alt="Portrait of Alishba Khalid" aspect="4/5" label="Portrait" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <RevealText as="p" className="label-caps text-ink-soft">
              About &mdash; 01
            </RevealText>
            <RevealText
              as="h2"
              delay={0.1}
              className="mt-6 font-italic-display text-3xl leading-tight text-ink md:text-5xl"
            >
              A textile&nbsp;mind, working in&nbsp;graphic&nbsp;form.
            </RevealText>
            <RevealText
              as="p"
              delay={0.2}
              className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Trained as a textile designer and practising as a graphic designer,
              I work where weave-thinking meets editorial layout. I design
              identity systems, lookbooks, and print collateral for fashion and
              lifestyle brands that value precision over decoration.
            </RevealText>
            <RevealText
              as="p"
              delay={0.3}
              className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Based in Karachi. Working with brands across Pakistan, the Gulf,
              and Europe.
            </RevealText>
          </div>
        </div>
      </section>

      {/* ─── SKETCH TEASER ─────────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper py-32 md:py-40">
        <div className="editorial-container">
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <div>
              <RevealText as="p" className="label-caps text-ink-soft">
                From the sketchbook
              </RevealText>
              <RevealText
                as="h2"
                delay={0.1}
                className="mt-4 font-italic-display text-3xl text-ink md:text-5xl"
              >
                Thinking, on paper.
              </RevealText>
            </div>
            <Link
              to="/sketch"
              className="label-caps text-ink hover:underline underline-offset-4 hidden md:inline-block"
              data-cursor="hover"
            >
              All sketches &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
            {sketches.slice(0, 3).map((s, i) => (
              <Link
                key={s.id}
                to="/sketch"
                className="group block"
                data-cursor="hover"
              >
                <div className="overflow-hidden">
                  <div className={`transition-transform duration-700 ease-out group-hover:scale-[1.03] ${i === 1 ? "md:mt-16" : ""}`}>
                    <Placeholder
                      src={s.src}
                      alt={s.alt}
                      aspect={s.size === "wide" ? "3/2" : s.size === "portrait" ? "4/5" : "1/1"}
                      label={s.caption}
                    />
                  </div>
                </div>
                <p className="mt-3 font-italic-display text-sm text-ink-soft md:text-base">
                  {s.caption}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/sketch" className="label-caps text-ink underline underline-offset-4">
              All sketches &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
