import Link from 'next/link';
export function PrototypeBadge() {
  return (
    <Link
      href="/about"
      className="prototype-badge"
      title="This is an independent product concept created for discussion. It is not produced or endorsed by Kiva and does not move real money."
    >
      <span aria-hidden="true" className="badge-dot" />
      Unofficial concept
    </Link>
  );
}
