"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../content";
import CargoObject from "./CargoObject";
gsap.registerPlugin(ScrollTrigger);

const panelColors = ["#f5b62a", "#f7c44c", "#f7cf67", "#f4db8e", "#f7f5ef", "#dce7e9", "#c4d6dc", "#a9c2cc", "#8eaeba"];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const masterProgress = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobile = matchMedia("(max-width:767px)").matches;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    setReducedMotion(reduce);
    const ctx = gsap.context(() => {
      if (mobile || reduce) {
        gsap.utils.toArray<HTMLElement>(".service-slide").forEach((el, index) => {
          gsap.from(el, { opacity: 0, y: 35, scrollTrigger: { trigger: el, start: "top 82%" } });
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => { setActive(index); masterProgress.current = index / services.length; },
            onEnterBack: () => { setActive(index); masterProgress.current = index / services.length; },
          });
        });
        return;
      }
      gsap.to(track.current, {
        xPercent: -100 * (services.length - 1) / services.length,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${services.length * 620}`,
          pin: true,
          scrub: .35,
          onUpdate: self => {
            masterProgress.current = self.progress;
            setActive(Math.min(services.length - 1, Math.round(self.progress * (services.length - 1))));
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="services" ref={root}>
    <div className="service-top section-pad">
      <p className="eyebrow">Capabilities / 01—09</p>
      <div className="service-rail">{services.map((service, index) => <span key={service.number} className={active === index ? "active" : ""}>{service.number}</span>)}</div>
    </div>
    <CargoObject progressRef={masterProgress} reducedMotion={reducedMotion} />
    <div className="service-track" ref={track}>
      {services.map((service, index) => <article className="service-slide" style={{ backgroundColor: panelColors[index] }} key={service.number}>
        <span className="service-index">{service.number}</span>
        <div className="service-cargo"><i /><i /><i /></div>
        <h2>{service.shortTitle}</h2>
        <div className="service-copy"><small>{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</small><h3>{service.title}</h3><p>{service.description}</p></div>
      </article>)}
    </div>
    <div className="service-direction">SCROLL TO MOVE CARGO <span>→</span></div>
  </section>;
}
