import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://hancockcountymainegop.org';

export const metadata: Metadata = {
  title: 'Hancock County Republican Committee',
  description: 'Connect with the Hancock County Republican Committee in Maine.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Hancock County GOP',
    description: 'Candidates, meetings, volunteer opportunities, and Republican news for Hancock County, Maine.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hancock County GOP',
    description: 'Candidates, meetings, volunteer opportunities, and Republican news for Hancock County, Maine.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
