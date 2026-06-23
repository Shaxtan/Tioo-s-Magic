"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2 } from "lucide-react";

type CartLine = { slug: string; qty: number };

type Props = {
  lines: CartLine[];
  subtotal: number;
  onSuccess?: () => void;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutButton({ lines, subtotal, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load Razorpay. Please check your internet connection.");

      const amountInPaise = Math.round(subtotal * 100);
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Could not create order. Please try again.");
      }

      const { orderId, amount, currency } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Tioos",
        description: `${lines.reduce((s, l) => s + l.qty, 0)} charm${lines.reduce((s, l) => s + l.qty, 0) > 1 ? "s" : ""}`,
        order_id: orderId,
        image: "/apple-touch-icon.png",
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) {
            setError("Payment verification failed. Please contact us with your payment ID: " + response.razorpay_payment_id);
            setLoading(false);
            return;
          }

          onSuccess?.();
          router.push("/order-success");
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#ff6f91",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
        setError(`Payment failed: ${response.error.description}. Please try again.`);
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        onClick={handleCheckout}
        disabled={loading || lines.length === 0}
      >
        {loading ? (
          <>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            Opening checkout…
          </>
        ) : (
          <>
            <ShoppingBag size={16} />
            Pay ₹{subtotal.toLocaleString("en-IN")} securely
          </>
        )}
      </button>

      {error && (
        <p style={{
          marginTop: "0.7rem",
          fontSize: "0.83rem",
          color: "var(--rose-deep)",
          background: "var(--blush)",
          borderRadius: "10px",
          padding: "0.6rem 0.8rem"
        }}>
          {error}
        </p>
      )}

      <p style={{
        fontSize: "0.74rem",
        color: "var(--cocoa-soft)",
        marginTop: "0.6rem",
        textAlign: "center"
      }}>
        🔒 Secured by Razorpay · UPI · Cards · NetBanking · Wallets
      </p>
    </div>
  );
}