"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { ShoppingBag, Loader2, MapPin, User, Phone, Mail, Home, X } from "lucide-react";

type CartLine = { slug: string; qty: number };

type Props = {
  lines: CartLine[];
  subtotal: number;
  onSuccess?: () => void;
};

type DeliveryDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

declare global {
  interface Window { Razorpay: any; }
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

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli","Daman & Diu",
  "Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"
];

function DeliveryModal({ subtotal, lines, onClose, onPaid }: {
  subtotal: number;
  lines: CartLine[];
  onClose: () => void;
  onPaid: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<DeliveryDetails>({
    name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const set = (k: keyof DeliveryDetails, v: string) => {
    setDetails(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<DeliveryDetails> = {};
    if (!details.name.trim()) e.name = "Name is required";
    if (!details.email.includes("@")) e.email = "Valid email required";
    if (!/^\d{10}$/.test(details.phone)) e.phone = "Enter 10-digit mobile number";
    if (!details.address.trim()) e.address = "Address is required";
    if (!details.city.trim()) e.city = "City is required";
    if (!details.state) e.state = "Select your state";
    if (!/^\d{6}$/.test(details.pincode)) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setError(null);
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load Razorpay. Check your internet connection.");

      const amountInPaise = Math.round(subtotal * 100);
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise, receipt: `rcpt_${Date.now()}` }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Could not create order. Please try again.");
      }

      const { orderId, amount, currency } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount, currency,
        name: "Tioos",
        description: `${lines.reduce((s, l) => s + l.qty, 0)} charm${lines.reduce((s, l) => s + l.qty, 0) > 1 ? "s" : ""}`,
        order_id: orderId,
        image: "/apple-touch-icon.png",
        prefill: {
          name: details.name,
          email: details.email,
          contact: "+91" + details.phone,
        },
        notes: {
          address: `${details.address}, ${details.city}, ${details.state} - ${details.pincode}`,
        },
        theme: { color: "#ff6f91" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ ...response, deliveryDetails: details }),
            body: JSON.stringify({
  ...response,
  deliveryDetails: details,
  subtotal,
  items: lines.map(l => `${l.qty}× ${l.slug}`).join(", "),
}),
          });
          if (!verifyRes.ok) {
            setError("Payment done but confirmation failed. Save this ID: " + response.razorpay_payment_id);
            setLoading(false);
            return;
          }
          onPaid();
          router.push("/order-success");
        },
        modal: { ondismiss: () => setLoading(false) },
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

  const modal = (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(87,66,53,0.45)", backdropFilter: "blur(4px)",
        animation: "fadeIn .2s ease",
      }} />

      <div style={{
        position: "fixed", inset: 0, zIndex: 201,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", pointerEvents: "none",
      }}>
        <div style={{
          pointerEvents: "all",
          background: "var(--cream)",
          borderRadius: "24px",
          width: "100%", maxWidth: "520px", maxHeight: "90vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 32px 64px -16px rgba(87,66,53,0.35)",
          animation: "slideUp .25s ease",
          overflow: "hidden",
        }}>

          {/* header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.2rem 1.5rem", borderBottom: "1px solid var(--line)", flexShrink: 0,
          }}>
            <div>
              <p style={{ margin: 0, fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "var(--rose)" }}>
                Almost there ✨
              </p>
              <h2 style={{ margin: "0.15rem 0 0", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.35rem", fontWeight: 600 }}>
                Where should we send it?
              </h2>
            </div>
            <button onClick={onClose} aria-label="Close" style={{
              width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center",
              background: "var(--blush)", border: "none", cursor: "pointer", color: "var(--cocoa)", flexShrink: 0,
            }}>
              <X size={16} />
            </button>
          </div>

          {/* scrollable body */}
          <div style={{ overflowY: "auto", padding: "1.4rem 1.5rem", flex: 1 }}>

            {/* order summary pill */}
            <div style={{
              background: "var(--blush)", borderRadius: "14px", padding: "0.75rem 1rem",
              marginBottom: "1.3rem", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cocoa)" }}>
                {lines.reduce((s, l) => s + l.qty, 0)} item{lines.reduce((s, l) => s + l.qty, 0) > 1 ? "s" : ""} · Free shipping 🇮🇳
              </span>
              <span style={{ fontFamily: "var(--hand)", fontSize: "1.35rem", fontWeight: 700, color: "var(--rose-deep)" }}>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* fields */}
            <Fld label="Full name" icon={<User size={13}/>} err={errors.name}>
              <input style={inp(!!errors.name)} placeholder="Priya Sharma"
                value={details.name} onChange={e => set("name", e.target.value)} />
            </Fld>
            <Fld label="Email address" icon={<Mail size={13}/>} err={errors.email}>
              <input style={inp(!!errors.email)} type="email" placeholder="priya@email.com"
                value={details.email} onChange={e => set("email", e.target.value)} />
            </Fld>
            <Fld label="Mobile number" icon={<Phone size={13}/>} err={errors.phone}>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <span style={{ ...inp(false), width: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "var(--cocoa-soft)" }}>+91</span>
                <input style={{ ...inp(!!errors.phone), flex: 1 }} placeholder="9876543210"
                  maxLength={10} value={details.phone}
                  onChange={e => set("phone", e.target.value.replace(/\D/g, ""))} />
              </div>
            </Fld>
            <Fld label="Flat / House / Street" icon={<Home size={13}/>} err={errors.address}>
              <textarea style={{ ...inp(!!errors.address), resize: "none", minHeight: 68, fontFamily: "var(--body)" }}
                placeholder="21B, Rose Apartments, MG Road"
                value={details.address} onChange={e => set("address", e.target.value)} />
            </Fld>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <Fld label="City" icon={<MapPin size={13}/>} err={errors.city} noMargin>
                <input style={inp(!!errors.city)} placeholder="Pune"
                  value={details.city} onChange={e => set("city", e.target.value)} />
              </Fld>
              <Fld label="Pincode" err={errors.pincode} noMargin>
                <input style={inp(!!errors.pincode)} placeholder="411001"
                  maxLength={6} value={details.pincode}
                  onChange={e => set("pincode", e.target.value.replace(/\D/g, ""))} />
              </Fld>
            </div>
            <Fld label="State" err={errors.state} last>
              <select style={{ ...inp(!!errors.state), appearance: "none", cursor: "pointer" }}
                value={details.state} onChange={e => set("state", e.target.value)}>
                <option value="">Select state</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Fld>

            {error && (
              <div style={{
                marginTop: "0.75rem", fontSize: "0.83rem", color: "var(--rose-deep)",
                background: "var(--blush)", borderRadius: "12px", padding: "0.65rem 0.9rem",
              }}>{error}</div>
            )}
          </div>

          {/* sticky footer */}
          <div style={{
            padding: "1rem 1.5rem 1.3rem", borderTop: "1px solid var(--line)",
            flexShrink: 0, background: "var(--shell)",
          }}>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "0.95rem" }}
              onClick={handlePay} disabled={loading}
            >
              {loading
                ? <><Loader2 size={17} style={{ animation: "spin 1s linear infinite" }}/> Opening payment…</>
                : <><ShoppingBag size={17}/> Pay ₹{subtotal.toLocaleString("en-IN")} securely</>
              }
            </button>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--cocoa-soft)", margin: "0.5rem 0 0" }}>
              🔒 Secured by Razorpay · UPI · Cards · NetBanking · Wallets
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modal, document.body);
}

function Fld({ label, icon, err, children, noMargin, last }: {
  label: string; icon?: React.ReactNode; err?: string;
  children: React.ReactNode; noMargin?: boolean; last?: boolean;
}) {
  return (
    <div style={{ marginBottom: (noMargin || last) ? 0 : "1rem" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.3rem", color: "var(--cocoa)" }}>
        {icon}{label}
      </label>
      {children}
      {err && <p style={{ fontSize: "0.72rem", color: "var(--rose-deep)", margin: "0.2rem 0 0" }}>{err}</p>}
    </div>
  );
}

const inp = (hasError: boolean): React.CSSProperties => ({
  width: "100%", fontFamily: "var(--body)", fontSize: "0.9rem",
  padding: "0.65rem 0.85rem", borderRadius: "12px", color: "var(--cocoa)",
  border: `1.5px solid ${hasError ? "var(--rose-deep)" : "var(--line)"}`,
  background: "var(--shell)", outline: "none", boxSizing: "border-box",
});

export default function CheckoutButton({ lines, subtotal, onSuccess }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        onClick={() => setShowModal(true)}
        disabled={lines.length === 0}
      >
        <ShoppingBag size={16} />
        Proceed to checkout · ₹{subtotal.toLocaleString("en-IN")}
      </button>
      <p style={{ fontSize: "0.74rem", color: "var(--cocoa-soft)", marginTop: "0.6rem", textAlign: "center" }}>
        🔒 Secured by Razorpay · UPI · Cards · NetBanking · Wallets
      </p>

      {showModal && (
        <DeliveryModal
          subtotal={subtotal}
          lines={lines}
          onClose={() => setShowModal(false)}
          onPaid={() => { setShowModal(false); onSuccess?.(); }}
        />
      )}
    </>
  );
}