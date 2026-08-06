"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function WhoWeAre() { const root = useRef<HTMLElement>(null); useEffect(() => { const ctx = gsap.context(() => gsap.from(".who-copy", { y: 70, opacity: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } }), root); return () => ctx.revert(); }, []); return <section className="who section-pad" ref={root}><p className="eyebrow">Who we are / Placeholder copy</p><p className="who-copy">We engineer <em>clear paths</em> through a complicated world—connecting cargo, people, and possibility with speed and precision.</p></section>; }
