import { services } from "../../content";
import type { CSSProperties } from "react";

const iconPaths = [
  <><path d="M3 13l8.5-3.5V4.8c0-.9.5-2.3 1.5-2.3s1.5 1.4 1.5 2.3v4.7L23 13v2l-8.5-1.5v4l2.5 1.8V21l-4-1-4 1v-1.7l2.5-1.8v-4L3 15z"/></>,
  <><path d="M4 14l2 5h12l2-5-8-3z"/><path d="M8 11V6h7l2 5M4 21c1.4-1 2.6-1 4 0s2.6 1 4 0 2.6-1 4 0 2.6 1 4 0"/></>,
  <><path d="M3 7h11v10H3zM14 11h4l3 3v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
  <><path d="M9 3h6v4H9zM8 7h8l2 4v10H6V11z"/><path d="M9 12h6M9 16h6"/></>,
  <><path d="M4 7l8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10"/></>,
  <><path d="M4 5h5v11H4zM9 10h5v6H9zM14 7h3v9h-3zM17 14h4v2h-4M3 19h18"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></>,
  <><path d="M7 3h10l2 4-1 14H6L5 7z"/><path d="M5 8h14M9 12l3-2 3 2-1 4h-4z"/></>,
  <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8v5H8zM7 17h10M12 13v4"/></>,
  <><path d="M7 17h9l3-7h-5l-2 4H8l-2-5H3"/><circle cx="8" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M14 7h4"/></>,
];

function ServiceIcon({ index }: { index: number }) {
  return <svg className="service-overview-icon" style={{ "--icon-delay": `${index * -.34}s` } as CSSProperties} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {iconPaths[index]}
  </svg>;
}

export default function ServicesOverview() {
  return <section className="services-overview section-pad" aria-labelledby="services-overview-title">
    <div className="services-overview-head">
      <p className="eyebrow">Complete capabilities / 01—09</p>
      <h2 id="services-overview-title">EVERY SERVICE.<br/><span>ONE NETWORK.</span></h2>
    </div>
    <div className="services-overview-grid">
      {services.map((service, index) => <article key={service.number}>
        <span>{service.number}</span>
        <ServiceIcon index={index}/>
        <div>
          <small>{service.shortTitle}</small>
          <h3>{service.title}</h3>
        </div>
        <i>↗</i>
      </article>)}
    </div>
  </section>;
}
