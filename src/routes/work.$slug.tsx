import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findWork, work } from "@/content/work";
import { BrandSlider } from "@/components/work/BrandSlider";
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
        { name: "description", content: p?.brief ?? "Brand identity case study." },
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
      <header className="editorial-container pb-12 md:pb-16">
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

      {/* Slide-bar preview */}
      <div className="editorial-container">
        <BrandSlider slides={piece.slides} title={piece.title} />
      </div>

      {/* Brief + description + palette */}
      <section className="editorial-container grid grid-cols-1 gap-10 py-24 md:grid-cols-12 md:gap-16 md:py-32">
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
            <p className="mt-8 label-caps text-ink-soft">Client &mdash; {piece.client}</p>
          )}
          <div className="mt-8 flex items-center gap-2">
            {piece.palette.map((c: string) => (
              <span
                key={c}
                className="h-8 w-8 rounded-full border border-ink/10"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <RevealText as="p" className="text-lg leading-relaxed text-ink-soft md:text-xl">
            {piece.description}
          </RevealText>
        </div>
      </section>

      {/* Next project */}
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
