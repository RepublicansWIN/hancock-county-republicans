import type { Metadata } from 'next';
import './globals.css';

const githubPages = process.env.GITHUB_PAGES === 'true';
const siteUrl = githubPages
  ? 'https://republicanswin.github.io/hancock-county-republicans'
  : 'https://hancock-county-republicans-maine.will1900-19-19.chatgpt.site';

export const metadata: Metadata = {
  title: 'Hancock County Republican Committee',
  description: 'Connect with the Hancock County Republican Committee in Maine.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Hancock County Republicans',
    description: 'Candidates, meetings, volunteer opportunities, and Republican news for Hancock County, Maine.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hancock County Republicans',
    description: 'Candidates, meetings, volunteer opportunities, and Republican news for Hancock County, Maine.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
