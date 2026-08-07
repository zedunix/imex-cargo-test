declare module "flubber" {
  export type Interpolator = (t: number) => string;
  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: { maxSegmentLength?: number; string?: boolean },
  ): Interpolator;
}
