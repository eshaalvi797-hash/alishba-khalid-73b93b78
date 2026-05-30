import { createFileRoute, Link } from "@tanstack/react-router";
import { ClothHero } from "@/components/three/ClothHero";
import { RevealText } from "@/components/ui/RevealText";
import { Placeholder } from "@/components/ui/Placeholder";
import { PosterGallery } from "@/components/work/PosterGallery";
import { posters } from "@/content/posters";
import { work } from "@/content/work";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alishba Khalid — Minimalist Graphic Designer for Fashion" },
      {
        name: "description",
        content:
          "Poster design and full brand identities for fashion, lifestyle, and the brands that prefer silence over noise. Karachi-based, working globally.",
      },
      { property: "og:title", content: "Alishba Khalid — Minimalist Graphic Designer for Fashion" },
      {
        property: "og:description",
        content:
          "Poster design and full brand identities for fashion, lifestyle, and the brands that prefer silence over noise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-paper">
        <div className="absolute inset-0">
          <ClothHero />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/40 via-paper/10 to-paper/60" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="editorial-container flex-1 flex items-center">
            <div className="max-w-4xl">
              <p className="label-caps text-ink-soft editorial-rise">
                Graphic Designer &mdash; Karachi
              </p>
              <h1
                className="mt-6 font-italic-display text-[12vw] leading-[0.95] tracking-tight text-ink md:text-[8vw] lg:text-[7rem] editorial-rise"
                style={{ animationDelay: "0.15s" }}
              >
                Restraint,
                <br />
                <span className="font-display not-italic font-bold">as a design</span>
                <br />
                language.
              </h1>
            </div>
          </div>

          <div className="editorial-container flex items-end justify-between pb-10">
            <p
              className="max-w-sm text-sm text-ink-soft md:text-base editorial-rise"
              style={{ animationDelay: "0.4s" }}
            >
              Poster design and full brand identities for fashion, lifestyle,
              and the brands that prefer silence over noise.
            </p>
            <p
              className="label-caps text-ink-soft editorial-rise hidden md:block"
              style={{ animationDelay: "0.55s" }}
            >
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
          <RevealText as="p" delay={0.2} className="mt-8 text-center label-caps text-ink-soft">
            &mdash; Studio note, 2025
          </RevealText>
        </div>
      </section>

      {/* ─── POSTER CARDS ─────────────────────────────────────────────────── */}
      <section className="bg-paper pb-32 md:pb-48">
        <div className="editorial-container">
          <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-6 md:mb-20">
            <RevealText as="h2" className="font-display text-3xl text-ink md:text-5xl">
              Poster Design
            </RevealText>
            <RevealText as="p" className="label-caps text-ink-soft" delay={0.1}>
              {posters.length} pieces &mdash; 2025
            </RevealText>
          </div>

          <PosterGallery posters={posters} />
        </div>
      </section>

      {/* ─── BRAND IDENTITIES TEASER ──────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper py-32 md:py-48">
        <div className="editorial-container">
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <div>
              <RevealText as="p" className="label-caps text-ink-soft">
                Full brand systems
              </RevealText>
              <RevealText as="h2" delay={0.1} className="mt-4 font-italic-display text-3xl text-ink md:text-5xl">
                Identity, from mark to package.
              </RevealText>
            </div>
            <Link
              to="/work"
              className="label-caps text-ink hover:underline underline-offset-4 hidden md:inline-block"
              data-cursor="hover"
            >
              View work &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {work.map((piece) => (
              <Link
                key={piece.slug}
                to="/work/$slug"
                params={{ slug: piece.slug }}
                className="group block"
                data-cursor="hover"
              >
                <div className="overflow-hidden bg-paper-2">
                  <img
                    src={piece.cover}
                    alt={`${piece.title} brand identity`}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="label-caps text-ink-soft">
                      {piece.number} &nbsp;/&nbsp; {piece.discipline}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{piece.title}</h3>
                  </div>
                  <p className="label-caps text-ink-soft">{piece.year}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/work" className="label-caps text-ink underline underline-offset-4">
              View work &rarr;
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
              I design posters and complete brand identities for fashion and
              lifestyle brands that value precision over decoration — from a
              single striking poster to a full system of logo, palette, and
              packaging.
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
    </>
  );
}
