"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroGate from "./components/sections/IntroGate";
import Hero from "./components/sections/Hero";
import WhoWeAre from "./components/sections/WhoWeAre";
import Services from "./components/sections/Services";
import GlobalReach from "./components/sections/GlobalReach";
import TrackRecord from "./components/sections/TrackRecord";
import FacilityHighlight from "./components/sections/FacilityHighlight";
import Testimonials from "./components/sections/Testimonials";
import CTAFooter from "./components/sections/CTAFooter";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: .9, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);
  return <main><IntroGate/><Hero/><WhoWeAre/><Services/><GlobalReach/><TrackRecord/><FacilityHighlight/><Testimonials/><CTAFooter/></main>;
}
