"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundVideo from "./components/BackgroundVideo";
import AmbientCargo from "./components/AmbientCargo";
import OpeningOrbit from "./components/OpeningOrbit";
import IntroGate from "./components/sections/IntroGate";
import Hero from "./components/sections/Hero";
import WhoWeAre from "./components/sections/WhoWeAre";
import ServicesOverview from "./components/sections/ServicesOverview";
import Services from "./components/sections/Services";
import GlobalReach from "./components/sections/GlobalReach";
import Awards from "./components/sections/Awards";
import Partners from "./components/sections/Partners";
import Gallery from "./components/sections/Gallery";
import FacilityHighlight from "./components/sections/FacilityHighlight";
import Testimonials from "./components/sections/Testimonials";
import CTAFooter from "./components/sections/CTAFooter";
gsap.registerPlugin(ScrollTrigger);

const LOGO_FOR_DARK_BG = "/brand/imex-logo-dark.png";
const LOGO_FOR_LIGHT_BG = "/brand/imex-logo-light.png";
const LIGHT_BACKGROUND_SECTIONS = ["who", "services", "partners", "facility", "cta"];

export default function App() {
  const [journeyLogo, setJourneyLogo] = useState(LOGO_FOR_DARK_BG);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.18, smoothWheel: true, wheelMultiplier: .92 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    const journey = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: .25,
      onUpdate: self => document.documentElement.style.setProperty("--journey", self.progress.toString()),
    });
    return () => { journey.kill(); gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const pickJourneyLogo = () => {
      const probeY = Math.min(118, window.innerHeight * .17);
      const probeX = Math.min(126, window.innerWidth * .22);
      const sectionAtLogo = document
        .elementsFromPoint(probeX, probeY)
        .map(element => element.closest<HTMLElement>("section, footer"))
        .find(Boolean);
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > footer"));
      const activeSection = sectionAtLogo || sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      const isLightBackground = activeSection
        ? LIGHT_BACKGROUND_SECTIONS.some(className => activeSection.classList.contains(className))
        : false;
      setJourneyLogo(isLightBackground ? LOGO_FOR_LIGHT_BG : LOGO_FOR_DARK_BG);
    };

    pickJourneyLogo();
    const trigger = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      onUpdate: pickJourneyLogo,
      onRefresh: pickJourneyLogo,
    });
    let frame = 0;
    const schedulePick = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pickJourneyLogo();
      });
    };
    window.addEventListener("scroll", schedulePick, { passive: true });
    window.addEventListener("resize", schedulePick);
    return () => {
      trigger.kill();
      window.removeEventListener("scroll", schedulePick);
      window.removeEventListener("resize", schedulePick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <main><BackgroundVideo/><AmbientCargo/><OpeningOrbit/><div className={`journey-ui ${journeyLogo === LOGO_FOR_LIGHT_BG ? "journey-ui-light" : "journey-ui-dark"}`} aria-hidden="true"><div className="journey-brand"><img src={journeyLogo} alt="" /></div><div className="journey-track"><i /></div><small>GLOBAL LOGISTICS / 2026</small></div><IntroGate/><Hero/><WhoWeAre/><Services/><ServicesOverview/><GlobalReach/><Awards/><Partners/><FacilityHighlight/><Gallery/><Testimonials/><CTAFooter/></main>;
}
