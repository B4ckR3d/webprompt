"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { PLANS, formatRupiah, type PlanId } from "@/lib/midtrans";

export default function PricingPage() {
  const { user, setShowLoginModal, setShowSubscribeModal, subscribe } = useAuth();

  const handleSubscribe = async (planId: PlanId) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowSubscribeModal(true);
  };

  const plans = [
    {
      id: "free" as const,
      name: "Free",
      price: "Gratis",
      period: "",
      description: "Get started with free prompts",
      features: [
        "20+ free prompts",
        "Basic categories",
        "One-click copy",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "pro_monthly" as PlanId,
      name: "Pro",
      price: formatRupiah(PLANS.pro_monthly.price),
      period: "/bulan",
      description: "Unlock all premium prompts",
      features: [
        "Semua 50+ premium prompts",
        "Kategori premium",
        "Update setiap minggu",
        "Lisensi komersial",
        "Email support",
      ],
      cta: "Subscribe Pro",
      popular: true,
    },
    {
      id: "lifetime" as PlanId,
      name: "Lifetime",
      price: formatRupiah(PLANS.lifetime.price),
      period: " sekali bayar",
      description: "Bayar sekali, pakai selamanya",
      features: [
        "Semua fitur Pro",
        "Akses selamanya",
        "Semua prompt masa depan",
        "Priority support",
        "Early access fitur baru",
      ],
      cta: "Get Lifetime",
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F4] border border-[#E7E5E4] mb-6">
          <span className="text-xs font-medium text-[#57534E]">Harga Sederhana</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C1917] mb-4">
          Pilih Plan Kamu
        </h1>
        <p className="text-lg text-[#57534E] max-w-xl mx-auto">
          Mulai gratis dan upgrade kapan saja. Tidak ada biaya tersembunyi.
        </p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-6 transition-all ${
                plan.popular
                  ? "border-[#2563EB] shadow-lg"
                  : "border-[#E7E5E4] hover:border-[#D6D3D1]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full">
                  Paling Populer
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-[#1C1917] mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-[#1C1917]">{plan.price}</span>
                  {plan.period && <span className="text-[#57534E] text-sm">{plan.period}</span>}
                </div>
                <p className="text-sm text-[#57534E]">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.id === "free" ? (
                <Link href="/catalog" className="block w-full py-2.5 rounded-lg text-center font-medium text-sm border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4] transition-colors">
                  {plan.cta}
                </Link>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    plan.popular
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      : "border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4]"
                  }`}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#A8A29E] mb-4">Metode pembayaran yang didukung</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["💳 Credit Card", "🏦 Bank Transfer", "📱 GoPay", "📱 OVO", "📱 DANA", "📱 ShopeePay", "🏪 Alfamart", "🏪 Indomaret"].map((method) => (
              <span key={method} className="px-3 py-1.5 bg-[#F5F5F4] rounded-lg text-xs font-medium text-[#57534E]">
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-[#1C1917] text-center mb-8">Pertanyaan Umum</h2>
          <div className="space-y-4">
            {[
              {
                q: "Apakah bisa menggunakan prompt untuk komersial?",
                a: "Ya! Plan Pro dan Lifetime include lisensi komersial. Prompt gratis hanya untuk penggunaan personal.",
              },
              {
                q: "Seberapa sering prompt baru ditambahkan?",
                a: "Kami menambahkan 5-10 prompt baru setiap minggu. User Pro dan Lifetime mendapat akses prioritas.",
              },
              {
                q: "AI tools apa saja yang kompatibel?",
                a: "Prompt kami kompatibel dengan Cursor, Bolt.new, v0, Claude, ChatGPT, dan kebanyakan AI coding assistant.",
              },
              {
                q: "Apakah bisa refund?",
                a: "Ya, kami memberikan garansi 7 hari uang kembali jika kamu tidak puas.",
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#FAFAF9] rounded-xl p-5">
                <h3 className="font-medium text-[#1C1917] mb-1.5">{faq.q}</h3>
                <p className="text-sm text-[#57534E]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
