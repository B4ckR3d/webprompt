"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { showLoginModal, setShowLoginModal, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      if (!name.trim()) {
        setError("Nama wajib diisi");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Password tidak cocok");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password minimal 6 karakter");
        setLoading(false);
        return;
      }
      const success = await register(name, email, password);
      if (!success) {
        setError("Email sudah terdaftar");
      }
    } else {
      const success = await login(email, password);
      if (!success) {
        setError("Email atau password salah");
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1C1917] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-[#1C1917]">PromptVault</span>
            </div>
            <button onClick={() => setShowLoginModal(false)} className="p-1.5 rounded-lg hover:bg-[#F5F5F4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6">
          <div className="flex bg-[#F5F5F4] rounded-lg p-0.5">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-white text-[#1C1917] shadow-sm"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                mode === "register"
                  ? "bg-white text-[#1C1917] shadow-sm"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-[#57534E] mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#57534E] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-[#57534E] mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Please wait...
              </span>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {mode === "login" && (
            <p className="text-center">
              <button type="button" className="text-xs text-[#2563EB] hover:underline">
                Forgot password?
              </button>
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="border-t border-[#E7E5E4] pt-4">
            <p className="text-center text-sm text-[#57534E]">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("register"); setError(""); }}
                    className="text-[#2563EB] font-medium hover:underline"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setError(""); }}
                    className="text-[#2563EB] font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
