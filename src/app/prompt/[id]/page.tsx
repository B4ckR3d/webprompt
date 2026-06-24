"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptCard from "@/components/PromptCard";
import { prompts } from "@/data/prompts";

export default function PromptDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const prompt = prompts.find((p) => p.id === id);
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Prompt Not Found</h1>
          <Link href="/catalog" className="text-indigo-600 font-medium">← Back to Catalog</Link>
        </div>
      </main>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const related = prompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-indigo-600">Catalog</Link>
          <span>/</span>
          <span className="text-slate-900">{prompt.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Preview */}
          <div className={`w-full md:w-80 h-48 rounded-2xl bg-gradient-to-br ${prompt.previewColor} shrink-0`} />

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium">
                {prompt.category}
              </span>
              {prompt.isPremium ? (
                <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-sm font-bold flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  PREMIUM
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-sm font-bold">FREE</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
              {prompt.title}
            </h1>
            <p className="text-lg text-slate-500 mb-4">{prompt.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                {prompt.rating} rating
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                {prompt.downloads.toLocaleString()} downloads
              </span>
              <span>by {prompt.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {prompt.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prompt Content */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-sm text-slate-500 font-mono">prompt.txt</span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                copied
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                  Copy Prompt
                </>
              )}
            </button>
          </div>
          <pre className="p-6 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-[500px] overflow-y-auto">
            {prompt.prompt}
          </pre>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
