"use client";
import { useEffect, useRef, type MutableRefObject } from "react";

type CargoObjectProps = { progressRef: MutableRefObject<number>; reducedMotion: boolean };
type Motion = "climb" | "wave" | "road" | "spiral" | "bounce" | "lift" | "caution" | "press" | "sCurve";

const serviceIcons = [
  "/service-icons/plane.svg", "/service-icons/ship.svg", "/service-icons/truck.svg",
  "/service-icons/spray-can-sparkles.svg", "/service-icons/box.svg", "/service-icons/dolly.svg",
  "/service-icons/triangle-exclamation.svg", "/service-icons/stamp.svg", "/service-icons/motorcycle.svg",
] as const;

const pathProfiles: { motion: Motion; lean: number }[] = [
  { motion: "climb", lean: 8 }, { motion: "wave", lean: 4 }, { motion: "road", lean: 3 },
  { motion: "spiral", lean: 6 }, { motion: "bounce", lean: 3 }, { motion: "lift", lean: 4 },
  { motion: "caution", lean: 2 }, { motion: "press", lean: 3 }, { motion: "sCurve", lean: 8 },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function pathOffset(motion: Motion, t: number) {
  const pi = Math.PI;
  switch (motion) {
    case "climb": return { x: Math.sin(pi * t) * 2, y: -Math.sin(pi * t) * 58 + Math.sin(4 * pi * t) * 7 };
    case "wave": return { x: 0, y: Math.sin(4 * pi * t) * 15 + Math.sin(8 * pi * t) * 5 };
    case "road": return { x: Math.sin(2 * pi * t) * 1.5, y: -Math.pow(Math.sin(2 * pi * t), 2) * 20 + Math.sin(6 * pi * t) * 4 };
    case "spiral": return { x: Math.sin(4 * pi * t) * 3.5, y: Math.sin(2 * pi * t) * 24 + Math.sin(6 * pi * t) * 7 };
    case "bounce": return { x: 0, y: -Math.abs(Math.sin(3 * pi * t)) * 37 };
    case "lift": return { x: Math.sin(2 * pi * t) * 2, y: -Math.sin(pi * t) * 28 + Math.sin(5 * pi * t) * 9 };
    case "caution": return { x: Math.sin(6 * pi * t) * 1.2, y: Math.sin(3 * pi * t) * 11 };
    case "press": return { x: 0, y: Math.pow(Math.sin(pi * t), 8) * 34 - Math.sin(3 * pi * t) * 8 };
    case "sCurve": return { x: Math.sin(2 * pi * t) * 4, y: Math.sin(2 * pi * t) * 31 };
  }
}

export default function CargoObject({ progressRef, reducedMotion }: CargoObjectProps) {
  const travelerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const lastProgressRef = useRef(-1);
  const activeIconRef = useRef(-1);

  useEffect(() => {
    let frame = 0;
    const preloadedIcons = serviceIcons.map(src => { const image = new Image(); image.src = src; return image; });
    const update = () => {
      const masterProgress = clamp(progressRef.current);
      if (masterProgress !== lastProgressRef.current) {
        lastProgressRef.current = masterProgress;
        const trackProgress = masterProgress * (serviceIcons.length - 1);
        const segmentIndex = Math.min(serviceIcons.length - 1, Math.round(trackProgress));
        const segmentStart = segmentIndex === 0 ? 0 : segmentIndex - .5;
        const segmentEnd = segmentIndex === serviceIcons.length - 1 ? serviceIcons.length - 1 : segmentIndex + .5;
        const segmentProgress = clamp((trackProgress - segmentStart) / (segmentEnd - segmentStart));
        const icon = iconRef.current;
        const traveler = travelerRef.current;

        if (icon && traveler) {
          if (activeIconRef.current !== segmentIndex) {
            activeIconRef.current = segmentIndex;
            icon.src = serviceIcons[segmentIndex];
          }
          if (reducedMotion) {
            traveler.style.transform = "translate3d(-50%, -50%, 0)";
          } else {
            const profile = pathProfiles[segmentIndex];
            const point = pathOffset(profile.motion, segmentProgress);
            const nextPoint = pathOffset(profile.motion, clamp(segmentProgress + .012));
            icon.style.transform = segmentIndex % 2 === 0 ? "scaleX(1)" : "scaleX(-1)";
            const direction = segmentIndex % 2 === 0 ? 1 : -1;
            const horizontalProgress = direction === 1 ? segmentProgress : 1 - segmentProgress;
            const x = 7 + horizontalProgress * 86 + point.x * direction;
            const rotation = clamp((nextPoint.y - point.y) * -.65 * direction, -profile.lean, profile.lean) * Math.sin(segmentProgress * Math.PI);
            traveler.style.transform = "translate3d(calc(" + x + "vw - 50%), calc(-50% + " + point.y + "px), 0) rotate(" + rotation + "deg)";
          }
        }
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => { cancelAnimationFrame(frame); preloadedIcons.forEach(image => { image.src = ""; }); };
  }, [progressRef, reducedMotion]);

  return <div className={"cargo-object-lane " + (reducedMotion ? "reduced" : "")} aria-hidden="true">
    <div className="cargo-morph-traveler" ref={travelerRef}><img ref={iconRef} src={serviceIcons[0]} alt="" draggable="false" /></div>
  </div>;
}
