import Link from 'next/link';
import site from '@/content/site.json';

const navItems = [
  ['About', '/about'],
  ['Candidates', '/candidates'],
  ['Events', '/events'],
  ['Gallery', '/gallery'],
  ['Volunteer', '/volunteer'],
  ['Contact', '/contact'],
] as const;

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
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="button button-small" href="/volunteer">Volunteer</Link>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand"><span className="brand-mark">HC</span><strong>{site.shortName}</strong></div>
      <p>{site.email} • {site.location}</p>
      <p className="disclaimer">{site.disclaimer}</p>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section>;
}
