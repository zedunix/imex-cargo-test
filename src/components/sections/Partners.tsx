const airlineLogos = [
  "457d9c", "4e75a1", "4ecf5c", "6387c8", "79e882", "83e5c6", "86db84", "86dcbd",
  "8c4bd5", "93ae2d", "a2025e", "b986cf", "d5163c", "d5d075", "efda58", "f979df",
].map(id => `/partners/airlines/667-home-${id}-1024x1024.webp`);

const networkLogos = ["0611d5", "37eb01", "4cc2ea", "8a59ae", "b131de", "f55c98"]
  .map(id => `/partners/network/667-home-${id}-1024x1024.webp`);

const shippingLogos = ["074989", "3a732b", "5e5eda", "ab02f6", "c0e405", "e7648e", "ee45d4"]
  .map(id => `/partners/shipping/667-home-${id}-1024x1024.webp`);

type PartnerLaneProps = {
  title: string;
  logos: string[];
  direction?: "forward" | "reverse";
  speed: "slow" | "slower" | "slowest";
};

function LogoSet({ logos, title, duplicate }: { logos: string[]; title: string; duplicate?: boolean }) {
  return <div className="partner-logo-set" aria-hidden={duplicate || undefined}>
    {logos.map((src, index) => <div className="partner-logo" key={`${duplicate ? "copy-" : ""}${index}-${src}`}>
      <img src={src} alt={duplicate ? "" : `${title} logo ${index + 1}`} loading="lazy" decoding="async" />
    </div>)}
  </div>;
}

function PartnerLane({ title, logos, direction = "forward", speed }: PartnerLaneProps) {
  const loopLogos = logos.length < 10 ? [...logos, ...logos] : logos;
  return <div className="partner-lane">
    <h3>{title}</h3>
    <div className="partner-logo-viewport">
      <div className={`partner-logo-marquee ${direction} ${speed}`}>
        <LogoSet logos={loopLogos} title={title}/>
        <LogoSet logos={loopLogos} title={title} duplicate/>
      </div>
    </div>
  </div>;
}

export default function Partners() {
  return <section className="partners" aria-labelledby="partners-title">
    <div className="partners-heading">
      <p className="eyebrow">Trusted across every route</p>
      <h2 id="partners-title">OUR GLOBAL<br/><span>PARTNERS.</span></h2>
    </div>
    <PartnerLane title="Network Partners" logos={networkLogos} speed="slowest"/>
    <PartnerLane title="Airline Partners" logos={airlineLogos} direction="reverse" speed="slower"/>
    <PartnerLane title="Shipping Line Partners" logos={shippingLogos} speed="slow"/>
  </section>;
}
