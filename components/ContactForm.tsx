"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const valid = form.name.trim() && form.email.includes("@") && form.message.trim();

  const submit = () => {
    if (!valid) return;
    // TODO: connect to a real handler (Formspree, Resend, or a Next.js route).
    setSent(true);
  };

  return (
    <div className="form-card">
      {sent ? (
        <div className="form-success">
          <Check size={18} /> Thank you! We&apos;ll reply within a day or two. 💌
        </div>
      ) : (
        <>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Priya" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="I'd love a custom charm of…" />
          </div>
          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit} disabled={!valid}>
            <Send size={16} /> Send message
          </button>
        </>
      )}
    </div>
  );
}
