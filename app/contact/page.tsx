import { ContactForm } from '@/components/contact-form';
import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import contact from '@/content/contact.json';
import site from '@/content/site.json';

export default function ContactPage() {
  return <main><SiteHeader /><PageHeader eyebrow={contact.eyebrow} title={contact.headline} intro={contact.introduction} />
    <section className="contact-section"><div className="contact-details"><p className="eyebrow">Committee information</p><h2>Reach the committee</h2><dl><div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div><div><dt>Phone</dt><dd>{site.phone}</dd></div><div><dt>Mail</dt><dd>{site.mailingAddress}</dd></div><div><dt>Social</dt><dd><a href={site.facebook}>Facebook</a></dd></div></dl><p className="response-note">{contact.responseNote}</p></div><div className="form-panel"><p className="eyebrow">Send a message</p><h2>How can we help?</h2><ContactForm /></div></section><SiteFooter /></main>;
}
