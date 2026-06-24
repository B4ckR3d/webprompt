// Midtrans Payment Gateway Configuration
// Docs: https://snap-docs.midtrans.com/

export const MIDTRANS_CONFIG = {
  // Sandbox - ganti dengan production keys saat deploy
  serverKey: process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-YOUR_SERVER_KEY",
  clientKey: process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-YOUR_CLIENT_KEY",
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  
  // Snap URL
  get snapUrl() {
    return this.isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
  },
  
  // API URL
  get apiUrl() {
    return this.isProduction
      ? "https://api.midtrans.com/v2"
      : "https://api.sandbox.midtrans.com/v2";
  },
};

// Plan pricing
export const PLANS = {
  pro_monthly: {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: 149000, // Rp 149.000 (~$9.99)
    description: "All premium prompts, monthly billing",
    duration: 30, // days
  },
  pro_yearly: {
    id: "pro_yearly",
    name: "Pro Yearly",
    price: 1499000, // Rp 1.499.000 (~$99.99)
    description: "All premium prompts, yearly billing (save 17%)",
    duration: 365,
  },
  lifetime: {
    id: "lifetime",
    name: "Lifetime Access",
    price: 749000, // Rp 749.000 (~$49.99)
    description: "One-time payment, lifetime access",
    duration: 36500, // ~100 years
  },
};

export type PlanId = keyof typeof PLANS;

// Generate unique order ID
export function generateOrderId(planId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PV-${planId.toUpperCase()}-${timestamp}-${random}`;
}

// Create Midtrans transaction
export async function createMidtransTransaction(
  orderId: string,
  planId: PlanId,
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  }
) {
  const plan = PLANS[planId];
  if (!plan) throw new Error("Invalid plan");
  
  const serverKey = Buffer.from(MIDTRANS_CONFIG.serverKey + ":").toString("base64");
  
  const body = {
    transaction_details: {
      order_id: orderId,
      gross_amount: plan.price,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone || "",
    },
    item_details: [
      {
        id: plan.id,
        price: plan.price,
        quantity: 1,
        name: plan.name,
        brand: "PromptVault",
        category: "Subscription",
      },
    ],
    callbacks: {
      finish: `${typeof window !== "undefined" ? window.location.origin : ""}/payment/finish`,
      unfinish: `${typeof window !== "undefined" ? window.location.origin : ""}/payment/unfinish`,
      error: `${typeof window !== "undefined" ? window.location.origin : ""}/payment/error`,
    },
    expiry: {
      start_time: new Date().toISOString().replace("T", " ").substring(0, 19) + " +0700",
      unit: "hours",
      duration: 24,
    },
  };

  const response = await fetch(`${MIDTRANS_CONFIG.apiUrl}/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${serverKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_messages?.[0] || "Payment creation failed");
  }

  return response.json();
}

// Verify Midtrans notification
export async function verifyMidtransNotification(notification: any) {
  const serverKey = Buffer.from(MIDTRANS_CONFIG.serverKey + ":").toString("base64");
  
  const response = await fetch(`${MIDTRANS_CONFIG.apiUrl}/${notification.order_id}/status`, {
    headers: {
      Authorization: `Basic ${serverKey}`,
    },
  });

  if (!response.ok) throw new Error("Failed to verify transaction");

  return response.json();
}

// Format Rupiah
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
