"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "../../content";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = matchMedia("(max-width: 767px)").matches;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      const setCounts = (progress: number) => counters.forEach(el => {
        const target = Number(el.dataset.count || 0);
        el.textContent = Math.round(target * progress).toLocaleString("en-US");
      });
      if (reduce) setCounts(1);
      else ScrollTrigger.create({
        trigger: root.current,
        start: mobile ? "top 78%" : "top top",
        end: mobile ? "bottom 42%" : "+=1800",
        scrub: true,
        onUpdate: self => {
          const countProgress = mobile
            ? gsap.utils.clamp(0, 1, self.progress)
            : gsap.utils.clamp(0, 1, (self.progress - .34) / .42);
          setCounts(countProgress);
        },
      });
      if (reduce || mobile) {
        gsap.from(words, { opacity: 0, y: 32, stagger: .08, duration: .55, scrollTrigger: { trigger: root.current, start: "top 75%" } });
        return;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=1800", pin: true, scrub: true } });
      tl.from(words, { y: 36, opacity: 0, scale: .96, stagger: .16, ease: "power3.out" })
        .from(".stat", { y: 40, opacity: 0, stagger: .1 }, .55);
    }, root);
    return () => ctx.revert();
  }, []);
  return <section className="hero section-pad" ref={root}><p className="eyebrow">Global freight / local precision</p><h1>{["WE", "MOVE", "WHAT"].map(w => <span className="word-clip" key={w}><span className="hero-word">{w}</span></span>)}<span className="word-clip accent-line"><span className="hero-word">MOVES YOU.</span></span></h1><div className="stats">{stats.map(s => <div className="stat" key={s.label}><strong><span data-count={s.value}>0</span>{s.suffix}</strong><span>{s.label}</span></div>)}</div></section>;
}
