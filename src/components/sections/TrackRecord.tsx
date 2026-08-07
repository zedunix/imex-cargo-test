import { awards } from "../../content";
const AwardSet = ({ duplicate = false }: { duplicate?: boolean }) => <div className="award-set" aria-hidden={duplicate || undefined}>
  {awards.map((award, index) => <article className="award-card" key={`${duplicate ? "duplicate-" : ""}${award.title}`}>
    <span>0{index + 1}</span>
    <strong>{award.year}</strong>
    <h3>{award.title}</h3>
    <p>{award.source}</p>
    <i>↗</i>
  </article>)}
</div>;

export default function TrackRecord() { return <section className="track section-pad">
  <div className="section-heading">
    <p className="eyebrow">Track record / Placeholder recognition</p>
    <h2>PROOF IN<br/><span>THE PROGRESS.</span></h2>
  </div>
  <div className="award-row">
    <div className="award-marquee"><AwardSet/><AwardSet duplicate/></div>
  </div>
</section>; }
