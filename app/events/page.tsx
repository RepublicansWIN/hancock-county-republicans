import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import events from '@/content/events.json';

export default function EventsPage() {
  const active = events.filter(event => event.active);
  return <main><SiteHeader /><PageHeader eyebrow="Events" title="Meet, listen, and get involved." intro="Committee meetings, community gatherings, candidate events, and volunteer opportunities can all be managed from the editing dashboard." />
    <section className="event-section"><div className="event-list">{active.map((event, index) => <article key={`${event.title}-${index}`} className={event.featured ? 'featured-event' : ''}><div className="event-date"><span>{event.date}</span><small>{event.time}</small></div><div><p className="event-location">{event.location}</p><h2>{event.title}</h2><p>{event.description}</p>{event.link && <a className="text-link" href={event.link}>Event details →</a>}</div></article>)}</div></section><SiteFooter /></main>;
}
