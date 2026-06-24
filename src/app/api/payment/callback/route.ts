import { NextRequest, NextResponse } from "next/server";
import { verifyMidtransNotification } from "@/lib/midtrans";

// Midtrans sends notification when payment status changes
export async function POST(request: NextRequest) {
  try {
    const notification = await request.json();
    
    // Verify the notification with Midtrans
    const statusResponse = await verifyMidtransNotification(notification);
    
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;
    const paymentType = statusResponse.payment_type;
    
    console.log(`[Midtrans] Order: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

    // Handle different transaction statuses
    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        // Transaction is challenged, need manual review
        console.log(`[Midtrans] Transaction ${orderId} is challenged`);
      } else if (fraudStatus === "accept") {
        // Payment successful
        console.log(`[Midtrans] Payment ${orderId} successful via ${paymentType}`);
        // TODO: Update user subscription in database
        // await updateUserSubscription(orderId, "pro");
      }
    } else if (transactionStatus === "settlement") {
      // Payment settled (for non-credit card)
      console.log(`[Midtrans] Payment ${orderId} settled`);
      // TODO: Update user subscription in database
    } else if (transactionStatus === "deny") {
      console.log(`[Midtrans] Payment ${orderId} denied`);
    } else if (transactionStatus === "cancel" || transactionStatus === "expire") {
      console.log(`[Midtrans] Payment ${orderId} cancelled/expired`);
    } else if (transactionStatus === "pending") {
      console.log(`[Midtrans] Payment ${orderId} pending`);
    }

    // Always return 200 to Midtrans
    return NextResponse.json({ status: "OK" });
  } catch (error: any) {
    console.error("[Midtrans] Callback error:", error);
    // Still return 200 to prevent Midtrans from retrying
    return NextResponse.json({ status: "OK" });
  }
}
