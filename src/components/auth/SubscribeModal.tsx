"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { PLANS, formatRupiah, type PlanId } from "@/lib/midtrans";

declare global {
  interface Window {
    snap: any;
  }
}

export default function SubscribeModal() {
  const { showSubscribeModal, setShowSubscribeModal, subscribe, user, setShowLoginModal } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (!showSubscribeModal) return null;

  const handleSubscribe = async (planId: PlanId) => {
    if (!user) {
      setShowSubscribeModal(false);
      setShowLoginModal(true);
      return;
    }

    setLoading(planId);
    setError("");

    try {
      // Call our API to create Midtrans transaction
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          name: user.name,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      // Check if Midtrans Snap is loaded
      if (typeof window.snap !== "undefined") {
        // Open Midtrans Snap popup
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log("Payment success:", result);
            subscribe(planId === "lifetime" ? "lifetime" : "pro");
            setShowSubscribeModal(false);
            alert("Payment successful! You now have access to all premium prompts.");
          },
          onPending: function (result: any) {
            console.log("Payment pending:", result);
            alert("Payment is pending. Please complete the payment.");
          },
          onError: function (result: any) {
            console.log("Payment error:", result);
            setError("Payment failed. Please try again.");
          },
          onClose: function () {
            console.log("Payment popup closed");
            setLoading(null);
          },
        });
      } else {
        // Fallback: redirect to Midtrans payment page
        if (data.redirectUrl) {
          window.open(data.redirectUrl, "_blank");
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "pro_monthly" as PlanId,
      popular: true,
    },
    {
      id: "pro_yearly" as PlanId,
      popular: false,
      badge: "SAVE 17%",
    },
    {
      id: "lifetime" as PlanId,
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#E7E5E4]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1C1917]">Upgrade to Pro</h2>
              <p className="text-sm text-[#57534E] mt-1">
                Unlock all premium prompts and start building faster
              </p>
            </div>
            <button onClick={() => setShowSubscribeModal(false)} className="p-1.5 rounded-lg hover:bg-[#F5F5F4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>
          )}

          {plans.map(({ id, popular, badge }) => {
            const plan = PLANS[id];
            return (
              <div
                key={id}
                className={`border-2 rounded-xl p-5 relative transition-all ${
                  popular
                    ? "border-[#2563EB] shadow-md"
                    : "border-[#E7E5E4] hover:border-[#D6D3D1]"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#2563EB] text-white text-xs font-semibold rounded">
                    POPULAR
                  </div>
                )}
                {badge && (
                  <div className="absolute -top-3 right-4 px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded">
                    {badge}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#1C1917] text-lg">{plan.name}</h3>
                    <p className="text-sm text-[#57534E]">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1C1917]">{formatRupiah(plan.price)}</div>
                    {id !== "lifetime" && (
                      <div className="text-xs text-[#A8A29E]">
                        /{id.includes("yearly") ? "year" : "month"}
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 mb-5">
                  <li className="flex items-center gap-2 text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    All premium prompts
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    {id === "lifetime" ? "All future prompts included" : "New prompts weekly"}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#57534E]">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    Commercial license
                  </li>
                  {id === "lifetime" && (
                    <li className="flex items-center gap-2 text-sm text-[#57534E]">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                      Priority support
                    </li>
                  )}
                </ul>

                <button
                  onClick={() => handleSubscribe(id)}
                  disabled={loading !== null}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-50 ${
                    popular
                      ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                      : "bg-[#F5F5F4] text-[#1C1917] hover:bg-[#E7E5E4] border border-[#E7E5E4]"
                  }`}
                >
                  {loading === id ? "Processing..." : `Subscribe — ${formatRupiah(plan.price)}`}
                </button>
              </div>
            );
          })}

          {/* Payment methods */}
          <div className="text-center pt-4 border-t border-[#E7E5E4]">
            <p className="text-xs text-[#A8A29E] mb-3">Secure payment powered by</p>
            <div className="flex items-center justify-center gap-4">
              <div className="px-3 py-1.5 bg-[#F5F5F4] rounded text-xs font-medium text-[#57534E]">
                💳 Credit Card
              </div>
              <div className="px-3 py-1.5 bg-[#F5F5F4] rounded text-xs font-medium text-[#57534E]">
                🏦 Bank Transfer
              </div>
              <div className="px-3 py-1.5 bg-[#F5F5F4] rounded text-xs font-medium text-[#57534E]">
                📱 E-Wallet
              </div>
              <div className="px-3 py-1.5 bg-[#F5F5F4] rounded text-xs font-medium text-[#57534E]">
                🏪 Alfamart/Indomaret
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
