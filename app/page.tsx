import Link from 'next/link';
import { SiteFooter, SiteHeader } from '@/components/site-shell';
import home from '@/content/home.json';

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>{home.headline}<br /><em>{home.headlineAccent}</em></h1>
          <p className="hero-lede">{home.introduction}</p>
          <div className="hero-actions">
            <Link className="button" href="/volunteer">Join the committee</Link>
            <Link className="text-link" href="/events">See upcoming events <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Hancock County coastal landscape">
          {home.heroImage ? <img className="hero-image" src={home.heroImage} alt="Hancock County, Maine" /> : <div className="coast-card"><p>Photo placeholder</p><span>Add a favorite Hancock County landscape or community photo here.</span></div>}
          <div className="location-ribbon"><span>44.5° N</span><strong>Downeast Maine</strong><span>68.4° W</span></div>
        </div>
      </section>

      <section className="quick-links" aria-label="Ways to participate">
        <Link href="/candidates"><span>01</span><strong>Meet the candidates</strong><small>Learn who is running locally</small></Link>
        <Link href="/events"><span>02</span><strong>Gather with neighbors</strong><small>View meetings and events</small></Link>
        <Link href="/volunteer"><span>03</span><strong>Make a difference</strong><small>Find a way to help</small></Link>
      </section>

      <section className="intro-band">
        <p className="eyebrow">{home.missionEyebrow}</p>
        <h2>{home.missionHeadline}</h2>
        <p>{home.missionText}</p>
      </section>
      <SiteFooter />
    </main>
  );
}
