import { services } from "../../content";

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
];

export default function ServicesOverview() {
  return <section className="services-overview section-pad" aria-labelledby="services-overview-title">
    <div className="services-overview-head">
      <p className="eyebrow">Complete capabilities / 01—09</p>
      <h2 id="services-overview-title">EVERY SERVICE.<br/><span>ONE NETWORK.</span></h2>
      <p>Nine connected capabilities, organized around the way cargo actually moves: fast decisions, careful handling, and visibility from origin to destination.</p>
    </div>
    <div className="services-overview-grid">
      {services.map((service, index) => <article key={service.number}>
        <div className="service-overview-top">
          <span className="service-overview-number">{service.number}</span>
          <span className="service-overview-icon" aria-hidden="true">
            <img src={serviceIcons[index]} alt="" loading="lazy" decoding="async" />
          </span>
        </div>
        <div className="service-overview-label">
          <small>{service.shortTitle}</small>
          <h3>{service.title}</h3>
        </div>
      </article>)}
    </div>
  </section>;
}
