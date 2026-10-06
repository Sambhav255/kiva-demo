import Link from 'next/link';
import { ChevronDown, Search, UserRound } from 'lucide-react';
export function GlobalNav() {
  return (
    <header className="global-nav">
      <div className="container nav-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="Kiva Impact Plan concept home"
        >
          kiva
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          <span className="context-label">
            Lend <ChevronDown size={14} aria-hidden="true" />
          </span>
          <span className="context-label desktop-only">Major gifts</span>
        </nav>
        <div
          className="search-context"
          aria-label="Loan search is unavailable in this prototype"
        >
          <Search size={18} aria-hidden="true" />
          <span>Search all loans</span>
        </div>
        <span className="context-label desktop-only partner-label">
          Partner with us
        </span>
        <Link href="/about" className="nav-link">
          About
        </Link>
        <button
          className="give-context desktop-only"
          disabled
          title="Prototype only"
        >
          Give
        </button>
        <span className="demo-balance" aria-label="Demo balance: zero dollars">
          $0 <span className="demo-label">demo</span>
        </span>
        <span className="avatar" aria-label="Demo account">
          <UserRound size={17} aria-hidden="true" />
        </span>
      </div>
    </header>
  );
}
