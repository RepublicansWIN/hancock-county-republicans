import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import home from '@/content/home.json';
import maineWire from '@/content/maine-wire.json';
import { publicAsset } from '@/lib/public-asset';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>{home.headline}<br /><em>{home.headlineAccent}</em></h1>
          <p className="hero-lede">{home.introduction}</p>
          <div className="hero-actions"><Link className="button" href="/events">Upcoming events</Link><Link className="text-link" href="/contact">Contact the committee <span aria-hidden="true">→</span></Link></div>
        </div>
        <div className="hero-art" aria-label="Hancock County coastal landscape">
          {home.heroImage ? <><img className="hero-image" src={publicAsset(home.heroImage)} alt="Hancock County, Maine" /><p className="photo-caption">Hancock County · Downeast Maine</p></> : <div className="county-panel"><span>Maine’s Hancock County GOP</span><strong>Local meetings, candidates, and volunteer opportunities.</strong><p>Serving communities throughout Hancock County, Maine.</p></div>}
        </div>
      </section>

      <section className="quick-links" aria-label="Ways to participate">
        <Link href="/candidates"><strong>Meet the candidates</strong><small>Local and state races</small></Link>
        <Link href="/events"><strong>Meetings & events</strong><small>What’s happening in Hancock County</small></Link>
        <Link href="/volunteer"><strong>Volunteer</strong><small>Find a practical way to help</small></Link>
      </section>

      <section className="intro-band">
        <div><p className="eyebrow">{home.missionEyebrow}</p><h2>{home.missionHeadline}</h2></div>
        <p>{home.missionText}</p>
      </section>

      <section className="news-section">
        <div className="news-heading"><p className="eyebrow">Maine news</p><h2>Latest from The Maine Wire</h2><p>A recent Maine headline from The Maine Wire.</p></div>
        <article className={`news-card ${maineWire.image ? '' : 'news-card-no-image'}`}>
          {maineWire.image && <img src={maineWire.image} alt="" />}
          <div><p className="news-source">{maineWire.source}{maineWire.published ? ` · ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }).format(new Date(maineWire.published))}` : ''}</p><h3>{maineWire.title}</h3><p>{maineWire.excerpt}</p><a className="text-link" href={maineWire.url} target="_blank" rel="noopener noreferrer">Read at The Maine Wire <span aria-hidden="true">→</span></a></div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
