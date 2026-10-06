import type { Metadata } from 'next';
import { inter, lora } from '@/lib/fonts';
import { GlobalNav } from '@/components/shell/GlobalNav';
import { AccountNav } from '@/components/shell/AccountNav';
import { PrototypeBadge } from '@/components/shell/PrototypeBadge';
import { Footer } from '@/components/shell/Footer';
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
        <GlobalNav />
        <AccountNav />
        <main
          id="main-content"
          className="container main-content"
          tabIndex={-1}
        >
          <div className="badge-row">
            <PrototypeBadge />
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
