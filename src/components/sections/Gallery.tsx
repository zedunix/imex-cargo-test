"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  ["667-home-619e98.webp", "The people behind every route"],
  ["667-home-14775a.webp", "Partnerships in motion"],
  ["667-home-3d10e1.webp", "Milestones worth sharing"],
  ["667-home-097b4d-scaled.webp", "Recognition built together"],
  ["667-home-697dd2-scaled.webp", "Team IMEX on the field"],
  ["667-home-739275.webp", "Moving forward as one"],
  ["667-home-821003.webp", "Across offices and operations"],
  ["667-home-cec28a.webp", "A growing global story"],
] as const;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".gallery-tile", {
        start: "top 92%",
        onEnter: batch => gsap.fromTo(batch,
          { opacity: 0, clipPath: "inset(8% 0 0 0)" },
          { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: .75, stagger: .08, ease: "power2.out" },
        ),
      });
      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach(tile => {
        gsap.fromTo(tile.querySelector("img"), { scale: 1.045 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="gallery-story section-pad" id="gallery" ref={root} aria-labelledby="gallery-title">
    <header className="gallery-story-head">
      <p className="eyebrow">Inside IMEX / people and progress</p>
      <h2 id="gallery-title">THE JOURNEY,<br/><span>IN FRAME.</span></h2>
      <p>From global logistics events to team milestones—a look at the people, partnerships, and places behind the shipments.</p>
    </header>
    <div className="gallery-mosaic">
      {galleryItems.map(([file, caption], index) => <figure className={"gallery-tile gallery-tile-" + (index + 1)} key={file}>
        <img src={"/gallery/" + file} alt={caption} loading="lazy" />
        <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption>
      </figure>)}
    </div>
  </section>;
}
