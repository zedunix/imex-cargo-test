"use client";
import { useEffect, useRef, type MutableRefObject } from "react";

type CargoObjectProps = {
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
};

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
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function CargoObject({ progressRef, reducedMotion }: CargoObjectProps) {
  const travelerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const lastProgressRef = useRef(-1);
  const activeIconRef = useRef(-1);

  useEffect(() => {
    let frame = 0;
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
            const loopProgress = clamp((segmentProgress - .5) / .3);
            const inLoop = segmentProgress >= .5 && segmentProgress <= .8;
            const angle = loopProgress * Math.PI * 2;
            const loopX = inLoop ? Math.sin(angle) * 5.5 : 0;
            const loopY = inLoop ? -(1 - Math.cos(angle)) * 52 : 0;
            const cruiseY = Math.sin(segmentProgress * Math.PI * 2) * 8;
            const x = 7 + segmentProgress * 86 + loopX;
            const rotation = inLoop ? loopProgress * 360 : Math.sin(segmentProgress * Math.PI) * 4;
            const edgePulse = segmentProgress > .9
              ? 1 + Math.sin((segmentProgress - .9) / .1 * Math.PI) * .12
              : 1;
            traveler.style.transform = `translate3d(calc(${x}vw - 50%), calc(-50% + ${cruiseY + loopY}px), 0) rotate(${rotation}deg) scale(${edgePulse})`;
          }
        }
      }
      frame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(frame);
  }, [progressRef, reducedMotion]);

  return <div className={`cargo-object-lane ${reducedMotion ? "reduced" : ""}`} aria-hidden="true">
    <div className="cargo-morph-traveler" ref={travelerRef}>
      <img ref={iconRef} src={serviceIcons[0]} alt="" draggable="false" />
    </div>
  </div>;
}
