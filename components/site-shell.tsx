import Link from 'next/link';
import site from '@/content/site.json';

export function SiteHeader() {
  return (
    <>
      <div className="county-bar">Hancock County, Maine</div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label={`${site.shortName} home`}>
          <span className="brand-mark" aria-hidden="true">HC</span>
          <span><strong>Hancock County</strong><small>Republican Committee</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/candidates">Candidates</Link>
          <Link href="/about">About</Link>
          <details className="nav-dropdown">
            <summary>Get involved <span aria-hidden="true">⌄</span></summary>
            <div className="nav-dropdown-menu">
              <Link href="/gallery">Gallery</Link>
              <Link href="/events">Events</Link>
              <Link href="/volunteer">Volunteer</Link>
            </div>
          </details>
        </nav>
        {site.donateEnabled ? <a className="button button-small" href={site.donateUrl || '/contact'}>Donate</a> : <Link className="button button-small" href="/contact">Contact</Link>}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand"><span className="brand-mark">HC</span><strong>{site.shortName}</strong></div>
      <p>{[site.email, site.location].filter(Boolean).join(' • ')}</p>
      <div className="footer-links"><Link href="/contact">Contact</Link>{site.facebook && <a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}{site.donateEnabled && <a href={site.donateUrl || '/contact'}>Donate</a>}</div>
      {site.disclaimer && <p className="disclaimer">{site.disclaimer}</p>}
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section>;
}
