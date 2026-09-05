import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import home from '@/content/home.json';
import maineWire from '@/content/maine-wire.json';
import volunteer from '@/content/volunteer.json';
import site from '@/content/site.json';
import { publicAsset } from '@/lib/public-asset';

export default function Home() {
  const facebookPluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(site.facebook)}&tabs=timeline&width=380&height=460&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`;

  return (
    <main>
      <SiteHeader />

      {site.facebookFeedEnabled && site.facebook && <section className="facebook-feature">
        <div className="facebook-feature-copy">
          <p className="eyebrow">From the committee</p>
          <h1>Latest from<br /><em>Hancock County.</em></h1>
          <p>News, meeting reminders, and updates from our Facebook page.</p>
          <div className="facebook-actions"><a className="button" href={site.facebook} target="_blank" rel="noopener noreferrer">Follow on Facebook</a>{site.donateEnabled && <a className="text-link" href={site.donateUrl || '/contact'}>Support our work <span aria-hidden="true">→</span></a>}</div>
        </div>
        <div className="social-window">
          <div className="social-window-bar">
            <span className="facebook-icon" aria-hidden="true">f</span>
            <div><strong>Hancock County Republicans</strong><small>Live Facebook updates</small></div>
            <span className="live-indicator"><i /> Live</span>
          </div>
          <div className="facebook-embed-wrap">
            <iframe title="Latest posts from Hancock County Republicans on Facebook" src={facebookPluginUrl} width="380" height="460" loading="eager" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
          </div>
          <a className="social-window-footer" href={site.facebook} target="_blank" rel="noopener noreferrer">View all updates on Facebook <span aria-hidden="true">↗</span></a>
        </div>
      </section>}

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>{home.headline}<br /><em>{home.headlineAccent}</em></h1>
          <p className="hero-lede">{home.introduction}</p>
          <div className="hero-actions"><Link className="button" href="/volunteer">Get involved</Link><Link className="text-link" href="/events">Upcoming events <span aria-hidden="true">→</span></Link></div>
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

      <section className="home-volunteer">
        <div className="home-volunteer-heading"><p className="eyebrow">{volunteer.eyebrow}</p><h2>{volunteer.headline}</h2><p>{volunteer.introduction}</p><Link className="button" href="/volunteer">Volunteer with us</Link></div>
        <div className="home-opportunities">{volunteer.opportunities.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
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
