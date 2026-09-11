import Link from 'next/link';
import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';

export default function ThanksPage() {
  return <main>
    <SiteHeader />
    <PageHeader eyebrow="Message sent" title="Thank you." intro="Your message has been sent to the Hancock County Republican Committee." />
    <section className="split-section">
      <div><p className="eyebrow">What happens next</p><h2>We’ll be in touch.</h2></div>
      <p>Someone from the committee will review your message and respond when appropriate. <Link className="text-link" href="/">Return home →</Link></p>
    </section>
    <SiteFooter />
  </main>;
}
