"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { services } from "../../content";

export default function CTAFooter() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => gsap.from(".cta-title", {
      scale: .9, opacity: 0, color: "#f5b62a", duration: .7, ease: "back.out(1.4)",
      scrollTrigger: { trigger: root.current, start: "top 65%" },
    }), root);
    return () => ctx.revert();
  }, []);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };

  return <footer className="cta section-pad" ref={root}>
    <div className="cta-main">
      <p className="eyebrow">Start a shipment</p>
      <h2 className="cta-title">LET’S MOVE<br/><span>FORWARD.</span></h2>
      <form onSubmit={submit}>
        <label>Name<input required placeholder="Your name" /></label>
        <label>Company<input required placeholder="Company name" /></label>
        <label>Phone<input type="tel" placeholder="+971 00 000 0000" /></label>
        <label>Email<input required type="email" placeholder="you@company.com" /></label>
        <label>Service<select defaultValue=""><option value="" disabled>Select service</option>{services.map(service => <option key={service.number}>{service.title}</option>)}</select></label>
        <label className="wide">Message<textarea rows={3} placeholder="Tell us what needs to move" /></label>
        <button className="submit" type="submit">{sent ? "REQUEST RECEIVED ✓" : "SEND REQUEST ↗"}</button>
      </form>
    </div>

    <div className="site-footer">
      <div className="footer-brand">
        <img src="/brand/imex-logo-dark.png" alt="IMEX Cargo LLC" />
        <p>15+ years moving freight with precision, from Dubai to every major trade lane on earth. ISO 9001:2015 certified and trusted by 1,580+ clients worldwide.</p>
        <div className="footer-social"><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Instagram">◎</a></div>
      </div>
      <nav className="footer-column" aria-label="Footer navigation">
        <strong>NAVIGATE</strong>
        <a href="#">About Us</a><a href="#">Services</a><a href="#">Global Reach</a><a href="#">Awards</a><a href="#">Gallery</a><a href="#">Careers</a><a href="#">Contact</a>
      </nav>
      <nav className="footer-column" aria-label="Services">
        <strong>SERVICES</strong>
        {services.map(service => <a href="#" key={service.number}>{service.title}</a>)}
      </nav>
      <div className="footer-column footer-contact">
        <strong>GET IN TOUCH</strong>
        <a href="tel:+97142823411">☎ &nbsp;+971 4 282 3411</a>
        <a href="mailto:enquiry@imex.ae">✉ &nbsp;enquiry@imex.ae</a>
        <p>Mon – Sat: 9:00 AM – 6:00 PM<br/>Sunday: Closed</p>
      </div>
    </div>
    <div className="footer-legal"><span>© 2026 IMEX Cargo LLC.</span><span>Dubai, United Arab Emirates</span><span>Freight without friction.</span></div>
  </footer>;
}
