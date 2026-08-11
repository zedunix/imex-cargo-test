"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { services } from "../../content";

export default function CTAFooter() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => gsap.from(".cta-title", {
      y: 28, opacity: 0, duration: .65, ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 72%" },
    }), root);
    return () => ctx.revert();
  }, []);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };

  return <footer className="cta section-pad" id="contact" ref={root}>
    <div className="cta-shell">
      <section className="cta-card" aria-labelledby="cta-title">
        <p className="eyebrow">Start a shipment</p>
        <h2 className="cta-title" id="cta-title">Let’s move<br/>forward.</h2>
        <p className="cta-card-copy">Tell us what needs to move and the IMEX team will route the next step.</p>
        <form onSubmit={submit}>
          <label>Name<input required placeholder="Your name" /></label>
          <label>Email<input required type="email" placeholder="you@company.com" /></label>
          <label className="wide">Service<select defaultValue=""><option value="" disabled>Select service</option>{services.map(service => <option key={service.number}>{service.title}</option>)}</select></label>
          <button className="submit" type="submit">{sent ? "REQUEST RECEIVED" : "SEND REQUEST"}</button>
        </form>
      </section>

      <div className="site-footer">
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#home">Home.</a>
          <a href="#about">About.</a>
          <a href="#services">Services.</a>
          <a href="#global-reach">Global Reach.</a>
          <a href="#gallery">Gallery.</a>
          <a href="#contact">Get in touch.</a>
        </nav>

        <div className="footer-info">
          <div className="footer-brand">
            <img src="/brand/imex-logo-light.png" alt="IMEX Cargo LLC" />
            <p>15+ years moving freight with precision across major trade lanes.</p>
          </div>
          <div className="footer-column">
            <strong>Head office</strong>
            <p>IMEX Cargo LLC<br/>Dubai, United Arab Emirates</p>
          </div>
          <div className="footer-column">
            <strong>Operations</strong>
            <p>Mon - Sat: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
          </div>
          <div className="footer-column footer-contact">
            <strong>Email</strong>
            <a href="mailto:enquiry@imex.ae">enquiry@imex.ae</a>
            <a href="tel:+97142823411">+971 4 282 3411</a>
          </div>
        </div>

        <div className="footer-legal"><span>© 2026 IMEX Cargo LLC. All rights reserved.</span><span>Dubai, United Arab Emirates</span></div>
      </div>
    </div>
    <div className="footer-statement" aria-hidden="true">LET’S DISCUSS TODAY</div>
  </footer>;
}
