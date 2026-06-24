"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptCard from "@/components/PromptCard";
import { prompts, categories, type Category } from "@/data/prompts";

const ITEMS_PER_PAGE = 12;

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [showPremium, setShowPremium] = useState<"all" | "free" | "premium">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchPremium =
        showPremium === "all" ||
        (showPremium === "free" && !p.isPremium) ||
        (showPremium === "premium" && p.isPremium);
      return matchSearch && matchCategory && matchPremium;
    });
  }, [search, activeCategory, showPremium]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedPrompts = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: Function, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1C1917] mb-2">
          Prompt Catalog
        </h1>
        <p className="text-[#57534E] mb-8">
          Browse {prompts.length} production-ready AI prompts
        </p>

        {/* Search */}
        <div className="relative max-w-lg mb-6">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Price filter */}
          <div className="flex items-center bg-white rounded-lg border border-[#E7E5E4] p-0.5">
            {(["all", "free", "premium"] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(setShowPremium, type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  showPremium === type
                    ? "bg-[#1C1917] text-white"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {type === "all" ? "All" : type === "free" ? "Free" : "Premium"}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-[#E7E5E4]"></div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(setActiveCategory, cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#1C1917] text-white"
                    : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-[#A8A29E] mt-4">
          Showing {paginatedPrompts.length} of {filtered.length} prompts
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </p>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-8">
        {paginatedPrompts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-[#1C1917] mb-1">No prompts found</h3>
            <p className="text-sm text-[#57534E]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn-secondary py-2 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#1C1917] text-white"
                    : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn-secondary py-2 px-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
