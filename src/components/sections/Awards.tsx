"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const recognitions = [
  { image: "/awards/667-home-0cc873.webp", year: "2025", title: "Egypt Air Cargo", detail: "3rd Position Award" },
  { image: "/awards/667-home-302b49.webp", year: "2025", title: "Swiss World Cargo", detail: "2nd Best Cargo Agent" },
  { image: "/awards/667-home-530470-600x403.jpg", year: "GLOBAL", title: "ISO 9001:2015", detail: "Quality Management Certified" },
  { image: "/awards/667-home-6df4fc.webp", year: "2024", title: "IAG Cargo", detail: "UAE Top Customer" },
  { image: "/awards/667-home-8e2fa7.webp", year: "MILESTONE", title: "Industry Recognition", detail: "Built through trusted partnerships" },
];

export default function Awards() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".awards-feature-media", { clipPath: "inset(0 100% 0 0)", duration: 1.05, ease: "power3.inOut", scrollTrigger: { trigger: root.current, start: "top 72%" } });
      gsap.from(".awards-feature-copy > *", { y: 35, opacity: 0, duration: .65, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".awards-feature-copy", start: "top 78%" } });
      ScrollTrigger.batch(".award-story-card", { start: "top 88%", onEnter: batch => gsap.fromTo(batch, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .08, ease: "back.out(1.35)" }) });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section className="awards-story section-pad" ref={root} aria-labelledby="awards-title">
    <header className="awards-story-head">
      <p className="eyebrow">Recognition / earned together</p>
      <h2 id="awards-title">PROOF OF<br/><span>PARTNERSHIP.</span></h2>
      <p>Milestones that reflect the trust of global carriers and the precision of our team.</p>
    </header>
    <article className="awards-feature">
      <div className="awards-feature-media"><img src="/awards/667-home-097b4d-scaled.webp" alt="IMEX team receiving a Swiss World Cargo award" loading="lazy" /></div>
      <div className="awards-feature-copy">
        <span>FEATURED RECOGNITION / 2025</span><h3>Best Revenue Producer</h3><strong>Swiss World Cargo</strong>
        <p>A landmark recognition of consistent performance, trusted partnership, and the people who keep every shipment moving.</p>
        <i>DELIVERING EXCELLENCE — BUILDING PARTNERSHIPS</i>
      </div>
    </article>
    <div className="awards-card-grid">
      {recognitions.map((award, index) => <article className="award-story-card" key={award.image}>
        <div className="award-story-image"><img src={award.image} alt={award.title + " " + award.detail} loading="lazy" /></div>
        <div className="award-story-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{award.year}</small></div>
        <h3>{award.title}</h3><p>{award.detail}</p>
      </article>)}
    </div>
  </section>;
}
