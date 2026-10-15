import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EB] dark:bg-[#0B0F12] text-[#1E241B] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}