"use client";
import { useEffect } from "react";
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
import TrackRecord from "./components/sections/TrackRecord";
import Partners from "./components/sections/Partners";
import FacilityHighlight from "./components/sections/FacilityHighlight";
import Testimonials from "./components/sections/Testimonials";
import CTAFooter from "./components/sections/CTAFooter";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
  return <main><BackgroundVideo/><AmbientCargo/><OpeningOrbit/><div className="journey-ui" aria-hidden="true"><div className="journey-brand">IM<span>EX</span></div><div className="journey-track"><i /></div><small>GLOBAL LOGISTICS / 2026</small></div><IntroGate/><Hero/><WhoWeAre/><Services/><ServicesOverview/><GlobalReach/><TrackRecord/><Partners/><FacilityHighlight/><Testimonials/><CTAFooter/></main>;
}
