import { ContactForm } from '@/components/contact-form';
import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import volunteer from '@/content/volunteer.json';
import site from '@/content/site.json';

export default function VolunteerPage() {
  return <main><SiteHeader /><PageHeader eyebrow={volunteer.eyebrow} title={volunteer.headline} intro={volunteer.introduction} />
    <section className="volunteer-section"><div className="opportunity-list">{volunteer.opportunities.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</div><div className="form-panel"><p className="eyebrow">Raise your hand</p><h2>Tell us how you’d like to help.</h2><ContactForm kind="volunteer" recipient={site.email} /></div></section><SiteFooter /></main>;
}
