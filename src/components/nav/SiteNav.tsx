import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="editorial-container flex items-center justify-between py-5 md:py-6">
        <Link
          to="/"
          className="font-italic-display text-xl tracking-tight text-ink md:text-[1.6rem]"
        >
          Alishba Khalid
        </Link>

        <ul className="flex items-center gap-6 md:gap-10">
          <li>
            <Link
              to="/work"
              className="label-caps text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "label-caps text-ink" }}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              to="/sketch"
              className="label-caps text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "label-caps text-ink" }}
            >
              Sketch
            </Link>
          </li>
          <li>
            <a
              href="#contact"
              className="label-caps text-ink-soft transition-colors hover:text-ink"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
