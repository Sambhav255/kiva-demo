import Link from 'next/link';
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="wordmark">
            kiva<span className="footer-concept"> / Impact Plan concept</span>
          </Link>
          <p>A clearer way to decide how your money moves.</p>
        </div>
        <div className="footer-copy">
          <Link href="/about">About this concept</Link>
          <p>
            This is an independent product concept. It is not produced or
            endorsed by Kiva and does not connect to a real Kiva account.
          </p>
          <p>
            Lending involves risk of principal loss. Repayment is not
            guaranteed. This prototype does not move real money.
          </p>
        </div>
      </div>
    </footer>
  );
}
