import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";
import { Resend } from "resend";

async function appendToSheet(row: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

async function sendOrderEmail(details: {
  name: string; email: string; phone: string;
  address: string; city: string; state: string; pincode: string;
}, paymentId: string, orderId: string, amount: number, items: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Tioos Orders <onboarding@resend.dev>",
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `🎀 New Order from ${details.name} — ₹${amount}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff8f2;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(120deg,#ff6f91,#e84e73);padding:28px 32px;">
          <h1 style="color:#fff;margin:0;font-size:22px;">🎀 New Order Received!</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">Tioos · Handmade Clay Charms</p>
        </div>
        <div style="padding:28px 32px;">
          <div style="background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:18px;border:1px solid #f0d8e0;">
            <h2 style="margin:0 0 14px;font-size:15px;text-transform:uppercase;letter-spacing:0.1em;color:#8c7565;">Order Summary</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Items</td><td style="padding:5px 0;color:#574235;text-align:right;">${items}</td></tr>
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Amount Paid</td><td style="padding:5px 0;color:#e84e73;font-weight:700;text-align:right;font-size:18px;">₹${amount}</td></tr>
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Payment ID</td><td style="padding:5px 0;color:#8c7565;text-align:right;font-size:12px;">${paymentId}</td></tr>
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Order ID</td><td style="padding:5px 0;color:#8c7565;text-align:right;font-size:12px;">${orderId}</td></tr>
            </table>
          </div>
          <div style="background:#fff;border-radius:12px;padding:18px 20px;margin-bottom:18px;border:1px solid #f0d8e0;">
            <h2 style="margin:0 0 14px;font-size:15px;text-transform:uppercase;letter-spacing:0.1em;color:#8c7565;">Customer Details</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Name</td><td style="padding:5px 0;color:#574235;text-align:right;">${details.name}</td></tr>
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Email</td><td style="padding:5px 0;color:#574235;text-align:right;">${details.email}</td></tr>
              <tr><td style="padding:5px 0;color:#574235;font-weight:600;">Mobile</td><td style="padding:5px 0;color:#574235;text-align:right;">+91 ${details.phone}</td></tr>
            </table>
          </div>
          <div style="background:#fff0f5;border-radius:12px;padding:18px 20px;border:1px solid #ffd9e1;">
            <h2 style="margin:0 0 10px;font-size:15px;text-transform:uppercase;letter-spacing:0.1em;color:#8c7565;">📦 Ship To</h2>
            <p style="margin:0;color:#574235;font-size:15px;line-height:1.7;">
              <strong>${details.name}</strong><br/>
              ${details.address}<br/>
              ${details.city}, ${details.state}<br/>
              PIN: ${details.pincode}<br/>
              📱 +91 ${details.phone}
            </p>
          </div>
          <p style="margin:20px 0 0;font-size:13px;color:#8c7565;text-align:center;">
            This order has also been saved to your
            <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}" style="color:#ff6f91;">Google Sheet</a>
          </p>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id, razorpay_payment_id, razorpay_signature,
      deliveryDetails, items, subtotal,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const orderDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const amountInRupees = subtotal || 0;
    const itemsSummary = items || "Charm order";

    const sheetRow = [
      orderDate, razorpay_payment_id,
      deliveryDetails?.name || "", deliveryDetails?.email || "",
      deliveryDetails?.phone || "", deliveryDetails?.address || "",
      deliveryDetails?.city || "", deliveryDetails?.state || "",
      deliveryDetails?.pincode || "", `₹${amountInRupees}`, itemsSummary,
    ];

    await Promise.allSettled([
      appendToSheet(sheetRow),
      sendOrderEmail(deliveryDetails, razorpay_payment_id, razorpay_order_id, amountInRupees, itemsSummary),
    ]);

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id });

  } catch (err: any) {
    console.error("[verify-payment]", err);
    return NextResponse.json({ error: err?.message || "Verification failed" }, { status: 500 });
  }
}