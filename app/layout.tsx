import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0b0b0a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'ASCII — Curated Design Studio | Teja & Lokesh Y',
  description:
    'Curated creative practice uniting high-performance web architecture (Teja) with bespoke brand identity and visual art direction (Lokesh Y). Based in India, working worldwide.',
  keywords: [
    'ASCII',
    'ASCII DIGITALS',
    'Curated Design Studio',
    'Web Architecture',
    'Frontend Engineering',
    'Brand Identity',
    'Graphic Design',
    'Poster Typography',
    'Next.js Portfolio',
    'Teja',
    'Lokesh Y'
  ],
  authors: [
    { name: 'Teja', url: 'mailto:asciisupport@gmail.com' },
    { name: 'Lokesh Y', url: 'mailto:asciisupport@gmail.com' }
  ],
  openGraph: {
    title: 'ASCII — Curated Design Studio',
    description:
      'Where engineering meets uncompromising visual craft. Bespoke websites, visual identities, and editorial print artifacts.',
    url: 'https://asciidigitals.com',
    siteName: 'ASCII',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASCII — Curated Design Studio',
    description:
      'Where engineering meets uncompromising visual craft. Teja (Web Architecture) + Lokesh Y (Brand Identity).',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@400;500;600;700&family=Oswald:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var saved = localStorage.getItem('ff_theme');
                var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })()`,
          }}
        />
        {/* Peacock 3D Loading Animation Assets */}
        <script src="/assets/three.min.js" defer></script>
        <script src="/assets/peacock_model.js" defer></script>
        <script src="/peacock-animation.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
