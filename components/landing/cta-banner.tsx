import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-[#F7F2EB] dark:bg-[#0B0F12] border-t border-[#EAE2D6] dark:border-[#222C35] relative overflow-hidden transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-[#EAE2D6]/80 dark:bg-[#141A1F] border border-[#8B9A6E]/40 p-8 sm:p-12 text-center space-y-6 shadow-xl relative">
          <div className="w-12 h-12 rounded-2xl bg-[#8B9A6E]/20 text-[#8B9A6E] flex items-center justify-center mx-auto border border-[#8B9A6E]/30 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E241B] dark:text-white tracking-tight">
            Ready to Analyze Your Next Repository?
          </h2>

          <p className="text-[#5A6653] dark:text-slate-300 text-base max-w-xl mx-auto">
            Paste any public or private GitHub repository link and get comprehensive architectural insights within seconds.
          </p>

          <div className="pt-2 flex justify-center">
            <Link href="/analyze">
              <Button size="lg" variant="primary">
                <span>Analyze Repository Now</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
