"use client";
import { useEffect,useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobeCanvas,{locations} from "../GlobeCanvas";
gsap.registerPlugin(ScrollTrigger);
export default function GlobalReach(){
  const root=useRef<HTMLElement>(null);
  const[active,setActive]=useState(0);

  useEffect(()=>{
    const mobile=matchMedia("(max-width:767px)").matches;
    const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ctx=gsap.context(()=>{
      if(!reduce){
        const items=gsap.utils.toArray<HTMLElement>(".country-route button");
        const batchTweens=new WeakMap<Element,gsap.core.Tween>();
        gsap.set(items,{scale:0,opacity:0,transformOrigin:"center center"});
        ScrollTrigger.batch(items,{
          start:"top 85%",
          interval:.1,
          batchMax:locations.length,
          onEnter:batch=>{
            const tween=gsap.to(batch,{
              scale:1,
              opacity:1,
              duration:.5,
              ease:"back.out(1.7)",
              stagger:.07,
              overwrite:true,
            });
            batch.forEach(item=>batchTweens.set(item,tween));
          },
          onLeaveBack:batch=>batchTweens.get(batch[0])?.reverse(),
        });
      }
      if(mobile||reduce)return;
      ScrollTrigger.create({trigger:root.current,start:"top top",end:`+=${locations.length*560}`,pin:true,scrub:true,onUpdate:self=>setActive(Math.min(locations.length-1,Math.floor(self.progress*locations.length)))})
    },root);
    return()=>ctx.revert()
  },[]);

  return <section className="reach section-pad" id="global-reach" ref={root}>
    <div className="reach-copy">
      <p className="eyebrow">Global reach / Connected locally</p>
      <span className="reach-count">{String(active+1).padStart(2,"0")} / {String(locations.length).padStart(2,"0")}</span>
      <h2>AROUND<br/><span>THE WORLD.</span></h2>
      <div className="active-country"><small>Current connection</small><strong>{locations[active].name}</strong><p>{locations[active].lat.toFixed(2)}° / {locations[active].lon.toFixed(2)}°</p></div>
      <div className="country-route">{locations.map((c,i)=><button key={c.name} className={active===i?"active":""} onClick={()=>setActive(i)}><i/>{c.name}</button>)}</div>
    </div>
    <div className="globe-wrap"><GlobeCanvas active={active}/><div className="globe-orbit">IMEX / LIVE ROUTE</div></div>
  </section>
}
