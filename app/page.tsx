import { ImpactOverview } from '@/components/home/ImpactOverview';
import { NextSteps } from '@/components/home/NextSteps';
import { LoanCard } from '@/components/common/LoanCard';
import { SurfaceCard } from '@/components/common/SurfaceCard';
import { SecondaryButton } from '@/components/common/Buttons';
import { staticLoanProvider } from '@/lib/loans/static-provider';
export default async function HomePage() {
  const loans = await staticLoanProvider.getHomeLoans();
  return (
    <>
      <ImpactOverview />
      <NextSteps />
      <section
        className="home-section"
        id="borrowers"
        aria-labelledby="borrowers-heading"
      >
        <div className="section-heading">
          <h2 id="borrowers-heading">Meet a few possibilities</h2>
          <span className="section-note">{staticLoanProvider.sourceLabel}</span>
        </div>
        <div className="card-grid">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </section>
      <section className="home-section" aria-labelledby="more-heading">
        <SurfaceCard className="more-card">
          <div>
            <span className="eyebrow">More ways to help</span>
            <h2 id="more-heading">Make room for the impact you care about.</h2>
            <p>
              Choosing borrowers, adding funds, and reusing repayments are
              connected decisions. An Impact Plan brings them into one view.
            </p>
          </div>
          <SecondaryButton href="/about">Explore the idea</SecondaryButton>
        </SurfaceCard>
      </section>
    </>
  );
}
