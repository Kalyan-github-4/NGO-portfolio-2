import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UnderConstruction } from "@/components/layout/under-construction";

/**
 * Fallback for anything the catch-all route doesn't handle (an explicit
 * notFound() call). Same notice, same chrome — never a bare 404 screen.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <UnderConstruction />
      </main>
      <Footer />
    </>
  );
}
