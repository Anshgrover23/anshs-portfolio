import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/provider/providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anshgrover.me'),
  title: 'Ansh Grover',
  description: "Ansh Grover's personal portfolio website.",
  authors: [{ name: 'Ansh Grover', url: 'https://anshgrover.me/' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Ansh Grover',
    description: "Ansh Grover's personal portfolio website.",
    type: 'website',
    url: 'https://anshgrover.me/',
    images: [
      {
        url: '/avatar.jpeg',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/avatar.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
