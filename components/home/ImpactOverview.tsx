import { SecondaryButton } from '@/components/common/Buttons';
export function ImpactOverview() {
  return (
    <section aria-labelledby="overview-heading">
      <div className="section-heading">
        <h1 id="overview-heading">Your impact starts here</h1>
        <span className="eyebrow">New lender · demo account</span>
      </div>
      <div className="impact-banner">
        <dl className="impact-stats">
          {[
            ['$0', 'Lending balance'],
            ['0', 'Borrowers supported'],
            ['$0', 'In loans funded'],
            ['0', 'Countries lent to'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <SecondaryButton href="#borrowers">Explore borrowers</SecondaryButton>
      </div>
    </section>
  );
}
