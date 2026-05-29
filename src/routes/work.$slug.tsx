import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findWork, work } from "@/content/work";
import { Placeholder } from "@/components/ui/Placeholder";
import { RevealText } from "@/components/ui/RevealText";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const piece = findWork(params.slug);
    if (!piece) throw notFound();
    return { piece };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.piece;
    return {
      meta: [
        { title: p ? `${p.title} — Alishba Khalid` : "Project — Alishba Khalid" },
        { name: "description", content: p?.brief ?? "Project case study." },
        { property: "og:title", content: p ? `${p.title} — Alishba Khalid` : "Project" },
        { property: "og:description", content: p?.brief ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-center">
      <div>
        <p className="label-caps text-ink-soft">Project not found</p>
        <h1 className="mt-4 font-italic-display text-4xl text-ink">No such piece.</h1>
        <Link to="/work" className="mt-8 inline-block label-caps text-ink underline">
          Back to the index
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <button onClick={reset} className="label-caps text-ink underline">Try again</button>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { piece } = Route.useLoaderData();
  const currentIndex = work.findIndex((w) => w.slug === piece.slug);
  const next = work[(currentIndex + 1) % work.length];

  return (
    <article className="bg-paper pt-32 md:pt-40">
      {/* ── Title block ───────────────────────────────────────────────── */}
      <header className="editorial-container pb-12 md:pb-20">
        <RevealText as="p" className="label-caps text-ink-soft">
          {piece.number} &nbsp;/&nbsp; {piece.discipline} &nbsp;/&nbsp; {piece.year}
        </RevealText>
        <RevealText
          as="h1"
          delay={0.1}
          className="mt-6 font-italic-display text-5xl leading-[0.95] text-ink md:text-7xl lg:text-8xl"
        >
          {piece.title}
        </RevealText>
      </header>

      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <div className="w-full">
        <div className="editorial-container">
          <Placeholder
            src={piece.cover.src}
            alt={piece.cover.alt}
            aspect={piece.cover.aspect}
            label={piece.title}
          />
        </div>
      </div>

      {/* ── Brief + Description ───────────────────────────────────────── */}
      <section className="editorial-container grid grid-cols-1 gap-10 py-24 md:grid-cols-12 md:gap-16 md:py-40">
        <div className="md:col-span-4">
          <RevealText as="p" className="label-caps text-ink-soft">
            The brief
          </RevealText>
          <RevealText
            as="p"
            delay={0.1}
            className="mt-6 font-italic-display text-2xl leading-snug text-ink md:text-3xl"
          >
            {piece.brief}
          </RevealText>
          {piece.client && (
            <p className="mt-8 label-caps text-ink-soft">
              Client &mdash; {piece.client}
            </p>
          )}
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <RevealText
            as="p"
            className="text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {piece.description}
          </RevealText>
        </div>
      </section>

      {/* ── Gallery: alternating full-bleed and constrained ───────────── */}
      <section className="space-y-24 pb-32 md:space-y-40 md:pb-48">
        {piece.gallery.map((img: typeof piece.gallery[number], i: number) =>
          img.fullBleed ? (
            <figure key={i} className="w-full">
              <Placeholder src={img.src} alt={img.alt} aspect={img.aspect} label={`Plate 0${i + 1}`} />
              {img.caption && (
                <figcaption className="editorial-container mt-4 label-caps text-ink-soft">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ) : (
            <figure key={i} className="editorial-container">
              <div className="mx-auto max-w-3xl">
                <Placeholder src={img.src} alt={img.alt} aspect={img.aspect} label={`Plate 0${i + 1}`} />
                {img.caption && (
                  <figcaption className="mt-4 font-italic-display text-base text-ink-soft md:text-lg">
                    {img.caption}
                  </figcaption>
                )}
              </div>
            </figure>
          ),
        )}
      </section>

      {/* ── Next project ─────────────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-paper py-24 md:py-32">
        <div className="editorial-container text-center">
          <p className="label-caps text-ink-soft">Next project &mdash; {next.number}</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="mt-4 inline-block font-italic-display text-4xl text-ink hover:underline underline-offset-8 md:text-7xl"
            data-cursor="hover"
          >
            {next.title} &rarr;
          </Link>
        </div>
      </section>
    </article>
  );
}
