"use client";
import { useEffect,useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function OpeningOrbit(){const root=useRef<HTMLDivElement>(null);useEffect(()=>{if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;const ctx=gsap.context(()=>{gsap.timeline({scrollTrigger:{trigger:".intro",start:"top top",endTrigger:".hero",end:"bottom top",scrub:.45}}).fromTo(root.current,{xPercent:30,yPercent:-22,scale:.62,rotate:-20,opacity:.8},{xPercent:-18,yPercent:28,scale:1.42,rotate:95,opacity:.3,ease:"none"});ScrollTrigger.create({trigger:".who",start:"top bottom",onEnter:()=>gsap.to(root.current,{opacity:0,duration:.25}),onLeaveBack:()=>gsap.to(root.current,{opacity:.3,duration:.25})})},root);return()=>ctx.revert()},[]);return <div className="opening-orbit" ref={root} aria-hidden="true"><i/><i/><span>IMEX / GLOBAL ROUTE / 01</span></div>}
