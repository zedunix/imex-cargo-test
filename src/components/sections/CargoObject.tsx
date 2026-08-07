"use client";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { interpolate } from "flubber";
import { vehiclePaths } from "../../data/vehiclePaths";

type CargoObjectProps = {
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function CargoObject({ progressRef, reducedMotion }: CargoObjectProps) {
  const travelerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lastProgressRef = useRef(-1);
  const interpolators = useMemo(
    () => vehiclePaths.slice(0, -1).map((path, index) =>
      interpolate(path, vehiclePaths[index + 1], { maxSegmentLength: 2 })
    ),
    [],
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const masterProgress = clamp(progressRef.current);
      if (masterProgress !== lastProgressRef.current) {
        lastProgressRef.current = masterProgress;
        const scaled = Math.min(vehiclePaths.length - Number.EPSILON, masterProgress * vehiclePaths.length);
        const segmentIndex = Math.min(vehiclePaths.length - 1, Math.floor(scaled));
        const segmentProgress = scaled - segmentIndex;
        const path = pathRef.current;
        const traveler = travelerRef.current;
        if (path && traveler) {
          if (reducedMotion) {
            path.setAttribute("d", vehiclePaths[segmentIndex]);
            traveler.style.transform = "translate3d(-50%, -50%, 0)";
          } else {
            const morphProgress = clamp((segmentProgress - .7) / .3);
            const shape = segmentIndex < interpolators.length ? interpolators[segmentIndex](morphProgress) : vehiclePaths[segmentIndex];
            const xPercent = -12 + segmentProgress * 124;
            const y = Math.sin(segmentProgress * Math.PI * 2) * 15;
            const rotation = Math.sin(segmentProgress * Math.PI) * 5;
            const impact = Math.sin(morphProgress * Math.PI);
            const scale = .95 + impact * .1;
            path.setAttribute("d", shape);
            traveler.style.transform = `translate3d(${xPercent}vw, calc(-50% + ${y}px), 0) rotate(${rotation}deg) scale(${scale})`;
          }
        }
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [interpolators, progressRef, reducedMotion]);

  return <div className={`cargo-object-lane ${reducedMotion ? "reduced" : ""}`} aria-hidden="true">
    <div className="cargo-morph-traveler" ref={travelerRef}>
      <svg viewBox="0 0 200 200" focusable="false"><path ref={pathRef} d={vehiclePaths[0]} /></svg>
    </div>
  </div>;
}
