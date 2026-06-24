"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { Prompt } from "@/data/prompts";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const { user, setShowLoginModal, setShowSubscribeModal } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (prompt.isPremium && !user.isSubscribed) {
      setShowSubscribeModal(true);
      return;
    }

    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonState = () => {
    if (!user) return { text: "Sign in to Copy", style: "bg-[#F5F5F4] text-[#57534E] hover:bg-[#E7E5E4]" };
    if (prompt.isPremium && !user.isSubscribed) return { text: "Subscribe to Copy", style: "bg-amber-50 text-amber-700 hover:bg-amber-100" };
    if (copied) return { text: "Copied!", style: "bg-emerald-100 text-emerald-700" };
    return { text: "Copy", style: "bg-[#F5F5F4] text-[#57534E] hover:bg-[#E7E5E4]" };
  };

  const btnState = getButtonState();
  const previewImage = prompt.previewImage || "/preview-images/01-cubekit-hero.png";

  return (
    <Link href={`/prompt/${prompt.id}`} className="group block">
      <div className="card overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* Real Screenshot Preview */}
        <div className="h-44 relative overflow-hidden bg-[#f5f5f4] border-b border-[#e7e5e4]">
          <img
            src={previewImage}
            alt={prompt.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badge */}
          <div className="absolute top-2 right-2 z-10">
            {prompt.isPremium ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-900 text-xs font-semibold shadow-sm">
                PRO
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-semibold shadow-sm">
                FREE
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-[#A8A29E] mb-1">{prompt.category}</div>
          <h3 className="text-sm font-semibold text-[#1C1917] mb-1 group-hover:text-[#2563EB] transition-colors line-clamp-1">
            {prompt.title}
          </h3>
          <p className="text-xs text-[#57534E] line-clamp-2 mb-3">
            {prompt.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-[#A8A29E]">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {prompt.rating}
              </span>
              <span>{prompt.downloads.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCopy}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${btnState.style}`}
            >
              {btnState.text}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
