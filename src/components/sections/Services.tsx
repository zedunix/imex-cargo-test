"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../content";
gsap.registerPlugin(ScrollTrigger);
export default function Services() {
  const root = useRef<HTMLElement>(null); const [active, setActive] = useState(0);
  useEffect(() => { const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; const mobile = matchMedia("(max-width: 767px)").matches; const ctx = gsap.context(() => { if (reduce || mobile) { gsap.utils.toArray<HTMLElement>(".service-panel").forEach(panel => gsap.from(panel, { opacity: 0, y: 40, scrollTrigger: { trigger: panel, start: "top 82%" } })); return; } ScrollTrigger.create({ trigger: root.current, start: "top top", end: `+=${services.length * 450}`, pin: true, scrub: true, onUpdate: self => setActive(Math.min(services.length - 1, Math.floor(self.progress * services.length))) }); }, root); return () => ctx.revert(); }, []);
  return <section className="services section-pad" ref={root}><div className="service-top"><p className="eyebrow">Capabilities / 01—09</p><div className="service-rail">{services.map((s, i) => <button key={s.number} className={active === i ? "active" : ""} onClick={() => setActive(i)} aria-label={`Show ${s.title}`}>{s.number}</button>)}</div></div><div className="service-stage">{services.map((s, i) => <article key={s.number} className={`service-panel ${active === i ? "active" : ""}`}><span className="service-index">{s.number}</span><h2>{s.shortTitle}</h2><div><h3>{s.title}</h3><p>{s.description}</p></div></article>)}</div></section>;
}
