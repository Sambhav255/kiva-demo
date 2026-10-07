import type { Metadata } from 'next';
import { inter, lora } from '@/lib/fonts';
import { PrototypeBadge } from '@/components/shell/PrototypeBadge';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  title: 'Kiva Impact Plan Concept',
  description:
    'An independent product concept exploring a clearer way for Kiva lenders to control how money is added, allocated, repaid, and reused.',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <header className="demo-header">
          <div className="container demo-header-inner">
            <Link
              href="/"
              className="demo-brand"
              aria-label="Kiva Impact Plan concept home"
            >
              <span className="wordmark">kiva</span>
              <span>Impact Plan</span>
            </Link>
            <PrototypeBadge />
          </div>
        </header>
        <main
          id="main-content"
          className="container main-content"
          tabIndex={-1}
        >
          {children}
        </main>
        <p className="demo-disclaimer container">
          Independent concept. Not produced or endorsed by Kiva. No real money
          moves.
        </p>
      </body>
    </html>
  );
}
