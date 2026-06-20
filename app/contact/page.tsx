import type { Metadata } from "next";
import { Sparkles, Mail, Instagram, MapPin, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Custom Orders",
  description:
    "Get in touch with Tioo's for orders, custom charms, or wholesale. Handmade clay charms from Pune, India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: "center" }}><Sparkles size={13} /> say hello</p>
          <h1>Let&apos;s make something cute</h1>
          <p>Questions, custom requests, or just want to chat charms? Drop us a line.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container contact-grid">
          <Reveal>
            <div>
              <h2 className="h-display" style={{ fontSize: "1.7rem", marginBottom: "1.4rem" }}>Reach us</h2>
              <div className="contact-line">
                <span className="ico"><Mail size={18} /></span>
                <div><span>Email</span><strong>hello@Tioo's.in</strong></div>
              </div>
              <div className="contact-line">
                <span className="ico"><Instagram size={18} /></span>
                <div><span>Instagram</span><strong>@Tioo's</strong></div>
              </div>
              <div className="contact-line">
                <span className="ico"><MessageCircle size={18} /></span>
                <div><span>WhatsApp</span><strong>+91 99780 22002</strong></div>
              </div>
              <div className="contact-line">
                <span className="ico"><MapPin size={18} /></span>
                <div><span>Based in</span><strong>Pune, India</strong></div>
              </div>
              <p className="lead" style={{ marginTop: "1.2rem", fontSize: "0.95rem" }}>
                For custom charms, tell us what you&apos;d love and we&apos;ll send back a quote and a timeline. 💌
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
