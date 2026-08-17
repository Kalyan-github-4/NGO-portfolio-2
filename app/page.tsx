import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { Values } from "@/components/about/values";
import { About } from "@/components/about/about";
import { Programs } from "@/components/home/programs";
import { Campaigns } from "@/components/home/campaigns";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { VolunteerCTA } from "@/components/home/volunteer-cta";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />

        {/* Below the rail the page lifts to a near-white ground, so the warm
            cream reads as the hero's own colour rather than the site's. */}
        <div className="bg-paper">
          <Values />
          <About />
        </div>

        {/* Programs and campaigns return to the hero's cream ground. */}
          <Programs />
          <Campaigns />
          <WhyChooseUs />
          <VolunteerCTA />
          <Newsletter />
        
        {/* Next sections (fee transparency) land here. */}
      </main>
      <Footer />
    </>
  );
}
