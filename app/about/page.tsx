import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import about from '@/content/about.json';

export default function AboutPage() {
  return <main><SiteHeader /><PageHeader eyebrow={about.eyebrow} title={about.headline} intro={about.introduction} />
    <section className="split-section"><div><p className="eyebrow">Purpose</p><h2>{about.missionTitle}</h2></div><p>{about.missionText}</p></section>
    <section className="values-section"><div className="section-heading"><p className="eyebrow">Committee values</p><h2>{about.valuesTitle}</h2></div><div className="value-grid">{about.values.map((value, index) => <article key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div></section>
    <SiteFooter /></main>;
}
