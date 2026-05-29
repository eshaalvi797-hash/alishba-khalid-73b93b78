export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-ink/10 bg-paper"
    >
      <div className="editorial-container py-16 md:py-24">
        <p className="font-italic-display text-3xl leading-tight text-ink md:text-5xl lg:text-6xl">
          Let&rsquo;s build
          <br />
          something quiet.
        </p>
        <a
          href="mailto:hello@alishbakhalid.design"
          className="mt-8 inline-block font-display text-xl text-ink underline-offset-8 hover:underline md:text-2xl"
          data-cursor="hover"
        >
          hello@alishbakhalid.design
        </a>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="label-caps text-ink-soft">
            &copy; {new Date().getFullYear()} Alishba Khalid — All work shown is original.
          </p>
          <ul className="flex gap-6">
            <li>
              <a
                href="https://www.linkedin.com/in/alishba-khalid"
                target="_blank"
                rel="noreferrer"
                className="label-caps text-ink-soft hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/"
                target="_blank"
                rel="noreferrer"
                className="label-caps text-ink-soft hover:text-ink"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="label-caps text-ink-soft hover:text-ink"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
