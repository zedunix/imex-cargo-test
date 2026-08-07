import { services } from "../../content";

export default function ServicesOverview() {
  return <section className="services-overview section-pad" aria-labelledby="services-overview-title">
    <div className="services-overview-head">
      <p className="eyebrow">Complete capabilities / 01—09</p>
      <h2 id="services-overview-title">EVERY SERVICE.<br/><span>ONE NETWORK.</span></h2>
    </div>
    <div className="services-overview-grid">
      {services.map(service => <article key={service.number}>
        <span>{service.number}</span>
        <div>
          <small>{service.shortTitle}</small>
          <h3>{service.title}</h3>
        </div>
        <i>↗</i>
      </article>)}
    </div>
  </section>;
}
