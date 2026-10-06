import Link from 'next/link';
export function AccountNav() {
  return (
    <nav className="account-nav" aria-label="Demo account navigation">
      <div className="container account-inner">
        <Link href="/my-impact">My impact</Link>
        {['My teams', 'Messages', 'Settings'].map((label) => (
          <button type="button" disabled title="Prototype only" key={label}>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
