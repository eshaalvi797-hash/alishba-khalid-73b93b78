import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/nav/SiteFooter";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="max-w-md text-center">
        <p className="label-caps text-ink-soft">Error 404</p>
        <h1 className="mt-4 font-italic-display text-5xl text-ink md:text-6xl">
          Nothing here.
        </h1>
        <p className="mt-4 text-ink-soft">
          The page you&rsquo;re looking for has moved or never existed.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block font-display text-lg text-ink underline underline-offset-4"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="max-w-md text-center">
        <p className="label-caps text-ink-soft">Something went wrong</p>
        <h1 className="mt-4 font-italic-display text-4xl text-ink">This page didn&rsquo;t load.</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-8 inline-block border border-ink px-6 py-3 label-caps text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Alishba Khalid" },
      { name: "theme-color", content: "#f5f3ee" },
      { title: "Alrishba-khalid-portfolio" },
      { property: "og:title", content: "Alrishba-khalid-portfolio" },
      { name: "twitter:title", content: "Alrishba-khalid-portfolio" },
      { name: "description", content: "Alishba Studio showcases textile and graphic design work, focusing on pattern exploration and visual concepts." },
      { property: "og:description", content: "Alishba Studio showcases textile and graphic design work, focusing on pattern exploration and visual concepts." },
      { name: "twitter:description", content: "Alishba Studio showcases textile and graphic design work, focusing on pattern exploration and visual concepts." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gCxVT9Br8JNwQtcRhMN02SjeSiW2/social-images/social-1780054823122-1778613286516.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gCxVT9Br8JNwQtcRhMN02SjeSiW2/social-images/social-1780054823122-1778613286516.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Raleway:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-ink">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Cursor />
      <SiteNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
