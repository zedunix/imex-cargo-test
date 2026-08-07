"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const playhead = { progress: 0 };
    const tween = gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: () => {
        if (Number.isFinite(video.duration)) video.currentTime = playhead.progress * Math.max(0, video.duration - 0.08);
      },
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });

    video.currentTime = 0.01;
    return () => tween.kill();
  }, [ready]);

  return (
    <div className={`video-surface ${ready ? "ready" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => setReady(true)}
      >
        <source src="/cargo-port-scroll.mp4" type="video/mp4" />
      </video>
      <div className="video-grade" />
      <div className="video-noise" />
    </div>
  );
}
