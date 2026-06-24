import { NextRequest, NextResponse } from "next/server";
import { createMidtransTransaction, generateOrderId, PLANS, type PlanId } from "@/lib/midtrans";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, name, email, phone } = body;

    // Validate plan
    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Validate customer info
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = generateOrderId(planId);

    // Create Midtrans transaction
    const transaction = await createMidtransTransaction(
      orderId,
      planId as PlanId,
      { name, email, phone }
    );

    return NextResponse.json({
      success: true,
      orderId,
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (error: any) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment" },
      { status: 500 }
    );
  }
}
