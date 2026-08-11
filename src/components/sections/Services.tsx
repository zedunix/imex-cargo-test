"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../content";
gsap.registerPlugin(ScrollTrigger);

const panelColors = ["#f5b62a", "#f7c44c", "#f7cf67", "#f4db8e", "#f7f5ef", "#dce7e9", "#c4d6dc", "#a9c2cc", "#8eaeba"];
const serviceIcons = [
  "/service-icons/plane.svg",
  "/service-icons/ship.svg",
  "/service-icons/truck.svg",
  "/service-icons/spray-can-sparkles.svg",
  "/service-icons/box.svg",
  "/service-icons/dolly.svg",
  "/service-icons/triangle-exclamation.svg",
  "/service-icons/stamp.svg",
  "/service-icons/motorcycle.svg",
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mobile = matchMedia("(max-width:767px)").matches;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx = gsap.context(() => {
      if (mobile || reduce) {
        gsap.utils.toArray<HTMLElement>(".service-slide").forEach((el, index) => {
          gsap.from(el, { opacity: 0, y: 35, scrollTrigger: { trigger: el, start: "top 82%" } });
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => { setActive(index); },
            onEnterBack: () => { setActive(index); },
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
            setActive(Math.min(services.length - 1, Math.round(self.progress * (services.length - 1))));
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="services" id="services" ref={root}>
    <div className="service-top section-pad">
      <p className="eyebrow">Capabilities / 01—09</p>
      <div className="service-rail">{services.map((service, index) => <span key={service.number} className={active === index ? "active" : ""}>{service.number}</span>)}</div>
    </div>
    <div className="service-track" ref={track}>
      {services.map((service, index) => <article className="service-slide" style={{ backgroundColor: panelColors[index] }} key={service.number}>
        <span className="service-index">{service.number}</span>
        <div className="service-icon-mark"><img src={serviceIcons[index]} alt="" draggable="false" /></div>
        <div className="service-word"><h2>{service.shortTitle}</h2></div>
        <div className="service-copy"><small>{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</small><h3>{service.title}</h3><p>{service.description}</p></div>
      </article>)}
    </div>
    <div className="service-direction">SCROLL TO MOVE CARGO <span>→</span></div>
  </section>;
}
