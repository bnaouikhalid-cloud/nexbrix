import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProblemSection } from "@/components/site/ProblemSection";
import { ConnectedChain } from "@/components/site/ConnectedChain";
import { VarianceProof } from "@/components/site/VarianceProof";
import { PurchasingMatching } from "@/components/site/PurchasingMatching";
import { StaffSection } from "@/components/site/StaffSection";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[5px] focus:bg-ink focus:px-4 focus:py-3 focus:text-[0.9375rem] focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <ProblemSection />
        <ConnectedChain />
        <VarianceProof />
        <PurchasingMatching />
        <StaffSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
