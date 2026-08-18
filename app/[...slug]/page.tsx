import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UnderConstruction } from "@/components/layout/under-construction";
import { navLinks } from "@/lib/site";

/**
 * Catch-all for every route that has no page of its own yet.
 *
 * The nav and footer link to sections that are still being built, so instead
 * of a 404 those URLs render an "under construction" notice inside the normal
 * page chrome. Real pages added under app/ take precedence over this route
 * automatically, so it shrinks as the site grows.
 */

/** Turn a URL slug into a readable label, preferring the nav's own wording. */
function titleFor(segments: string[]) {
  const href = `/${segments.join("/")}`;

  for (const link of navLinks) {
    if (link.href === href) return link.label;
    const child = link.children?.find((c) => c.href === href);
    if (child) return child.label;
  }

  return segments[segments.length - 1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${titleFor(slug)} — coming soon` };
}

export default async function UnderConstructionPage({
  params,
}: PageProps<"/[...slug]">) {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <UnderConstruction
          title={titleFor(slug)}
          showDonate={slug[0] !== "donate"}
        />
      </main>
      <Footer />
    </>
  );
}
