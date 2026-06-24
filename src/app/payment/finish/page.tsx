"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentFinishContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const statusCode = searchParams.get("status_code");
  const transactionStatus = searchParams.get("transaction_status");

  const isSuccess = transactionStatus === "capture" || transactionStatus === "settlement";

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-sm border border-[#E7E5E4]">
        {isSuccess ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#1C1917] mb-2">Payment Successful!</h1>
            <p className="text-sm text-[#57534E] mb-6">
              Thank you for your purchase. You now have access to all premium prompts.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#1C1917] mb-2">Payment Pending</h1>
            <p className="text-sm text-[#57534E] mb-6">
              Your payment is being processed. Please complete the payment if you haven&apos;t already.
            </p>
          </>
        )}

        {orderId && (
          <div className="bg-[#F5F5F4] rounded-lg p-3 mb-6">
            <p className="text-xs text-[#A8A29E]">Order ID</p>
            <p className="text-sm font-mono font-medium text-[#1C1917]">{orderId}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/" className="btn-secondary flex-1 text-center py-2.5">
            Home
          </Link>
          <Link href="/catalog" className="btn-primary flex-1 text-center py-2.5">
            Browse Prompts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFinishPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-[#A8A29E]">Loading...</div>
      </div>
    }>
      <PaymentFinishContent />
    </Suspense>
  );
}
