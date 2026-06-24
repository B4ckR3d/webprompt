"use client";

import Link from "next/link";

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-8 text-center shadow-sm border border-[#E7E5E4]">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-[#1C1917] mb-2">Payment Failed</h1>
        <p className="text-sm text-[#57534E] mb-6">
          Something went wrong with your payment. Please try again.
        </p>
        <div className="flex gap-3">
          <Link href="/" className="btn-secondary flex-1 text-center py-2.5">
            Home
          </Link>
          <Link href="/pricing" className="btn-primary flex-1 text-center py-2.5">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
