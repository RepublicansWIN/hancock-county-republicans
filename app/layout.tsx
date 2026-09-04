import type { Metadata } from 'next';
import { Libre_Franklin, Lora } from 'next/font/google';
import './globals.css';

const sans = Libre_Franklin({ variable: '--font-sans', subsets: ['latin'] });
const serif = Lora({ variable: '--font-serif', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hancock County Republican Committee',
  description: 'Connect with the Hancock County Republican Committee in Maine.',
  metadataBase: new URL('https://hancock-county-republicans-maine.will1900-19-19.chatgpt.site'),
  openGraph: {
    title: 'Hancock County Republicans',
    description: 'Local voices. Shared purpose.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hancock County Republicans',
    description: 'Local voices. Shared purpose.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
