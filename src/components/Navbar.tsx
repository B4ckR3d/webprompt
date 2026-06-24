"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, setShowLoginModal, setShowSubscribeModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E7E5E4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1C1917] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1C1917]">PromptVault</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors">
              Home
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors">
              Catalog
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors">
              Pricing
            </Link>
            <Link href="/admin" className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors">
              Admin
            </Link>

            <div className="w-px h-6 bg-[#E7E5E4]"></div>

            {user ? (
              <div className="flex items-center gap-3">
                {!user.isSubscribed && (
                  <button
                    onClick={() => setShowSubscribeModal(true)}
                    className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    ⭐ Upgrade
                  </button>
                )}
                {user.isSubscribed && (
                  <span className="badge badge-success text-xs">{user.plan === "lifetime" ? "Lifetime" : "Pro"}</span>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#E7E5E4] flex items-center justify-center text-xs font-medium text-[#57534E]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#1C1917]">{user.name}</span>
                </div>
                <button onClick={logout} className="text-xs text-[#A8A29E] hover:text-[#57534E]">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => setShowLoginModal(true)} className="text-sm font-medium text-[#57534E] hover:text-[#1C1917]">
                  Sign in
                </button>
                <button onClick={() => setShowLoginModal(true)} className="btn-primary text-sm py-2">
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#F5F5F4] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E7E5E4] bg-white">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#57534E] hover:bg-[#F5F5F4]" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/catalog" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#57534E] hover:bg-[#F5F5F4]" onClick={() => setIsOpen(false)}>Catalog</Link>
            <Link href="/pricing" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#57534E] hover:bg-[#F5F5F4]" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/admin" className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#57534E] hover:bg-[#F5F5F4]" onClick={() => setIsOpen(false)}>Admin</Link>
            
            <div className="border-t border-[#E7E5E4] pt-3 mt-3">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#E7E5E4] flex items-center justify-center text-xs font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-[#A8A29E]">{user.email}</div>
                    </div>
                  </div>
                  {!user.isSubscribed && (
                    <button onClick={() => { setShowSubscribeModal(true); setIsOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50">
                      ⭐ Upgrade to Pro
                    </button>
                  )}
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-lg text-sm text-[#57534E] hover:bg-[#F5F5F4]">
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button onClick={() => { setShowLoginModal(true); setIsOpen(false); }} className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#57534E] hover:bg-[#F5F5F4]">
                    Sign in
                  </button>
                  <button onClick={() => { setShowLoginModal(true); setIsOpen(false); }} className="block w-full btn-primary text-center text-sm py-2.5">
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
