import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServicesSection } from "@/components/sections/services-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ServicesSection />
        <FleetSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
