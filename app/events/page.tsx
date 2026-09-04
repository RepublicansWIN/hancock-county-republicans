import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import events from '@/content/events.json';

export default function EventsPage() {
  const active = events.filter(event => event.active);
  return <main><SiteHeader /><PageHeader eyebrow="Events" title="Meetings and events in Hancock County." intro="Committee meetings, community gatherings, candidate events, and volunteer opportunities." />
    <section className="event-section">{active.length === 0 ? <div className="public-empty"><h2>No events are posted yet.</h2><p>Please check back for upcoming committee meetings and community events.</p></div> : <div className="event-list">{active.map((event, index) => <article key={`${event.title}-${index}`} className={event.featured ? 'featured-event' : ''}><div className="event-date"><span>{event.date}</span><small>{event.time}</small></div><div><p className="event-location">{event.location}</p><h2>{event.title}</h2><p>{event.description}</p>{event.link && <a className="text-link" href={event.link}>Event details →</a>}</div></article>)}</div>}</section><SiteFooter /></main>;
}
