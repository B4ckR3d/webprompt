"use client";

import { useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptCard from "@/components/PromptCard";
import { useAuth } from "@/context/AuthContext";
import { prompts, categories } from "@/data/prompts";

function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const { user } = useAuth();
  const mixedPrompts = useMemo(() => shuffleArray(prompts).slice(0, 9), []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F4] border border-[#E7E5E4] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-medium text-[#57534E]">80+ Production-Ready Prompts</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1C1917] tracking-tight mb-6 leading-[1.1]">
              Find the perfect prompt
              <br />
              <span className="text-[#A8A29E]">for your next project</span>
            </h1>

            <p className="text-lg text-[#57534E] mb-8 leading-relaxed max-w-xl">
              Browse curated AI prompts for landing pages, hero sections, dashboards, and UI components. 
              Copy, paste, and launch in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/catalog" className="btn-primary text-base px-6 py-3">
                Browse All Prompts
              </Link>
              <Link href="/pricing" className="btn-secondary text-base px-6 py-3">
                View Pricing
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[#E7E5E4]">
              <div>
                <div className="text-2xl font-bold text-[#1C1917]">80+</div>
                <div className="text-sm text-[#A8A29E]">AI Prompts</div>
              </div>
              <div className="w-px h-10 bg-[#E7E5E4]"></div>
              <div>
                <div className="text-2xl font-bold text-[#1C1917]">15+</div>
                <div className="text-sm text-[#A8A29E]">Categories</div>
              </div>
              <div className="w-px h-10 bg-[#E7E5E4]"></div>
              <div>
                <div className="text-2xl font-bold text-[#1C1917]">50K+</div>
                <div className="text-sm text-[#A8A29E]">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-[#A8A29E] uppercase tracking-wider mb-6">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat}
                href={`/catalog?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 rounded-lg bg-white border border-[#E7E5E4] text-sm font-medium text-[#57534E] hover:border-[#D6D3D1] hover:text-[#1C1917] transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Prompts (Mixed Free + Premium) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1C1917]">Popular Prompts</h2>
              <p className="text-sm text-[#57534E] mt-1">
                {user 
                  ? "Discover our most popular prompts" 
                  : "Sign in to start copying prompts"}
              </p>
            </div>
            <Link href="/catalog" className="text-sm font-medium text-[#2563EB] hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mixedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1C1917] mb-2">How it works</h2>
            <p className="text-[#57534E]">Three simple steps to stunning websites</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse & Preview", desc: "Explore our curated collection of AI prompts organized by category and use case." },
              { step: "02", title: "Copy with One Click", desc: "Sign in for free prompts, subscribe for premium. Copy instantly to clipboard." },
              { step: "03", title: "Paste & Launch", desc: "Paste into Cursor, Bolt, v0, Claude, or any AI tool and watch the magic happen." },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-xl border border-[#E7E5E4] bg-white">
                <div className="text-xs font-bold text-[#A8A29E] mb-3">STEP {item.step}</div>
                <h3 className="text-lg font-semibold text-[#1C1917] mb-2">{item.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1C1917]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-white/60 mb-8">
            Join thousands of designers and developers who use PromptVault to ship faster.
          </p>
          <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#1C1917] font-semibold hover:bg-white/90 transition-colors">
            Start Free →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
