import { SurfaceCard } from '@/components/common/SurfaceCard';
import { SecondaryButton } from '@/components/common/Buttons';
import {
  type Plan,
  fundingDescription,
  moneyFlow,
  participationLabels,
  repaymentLabels,
} from '@/lib/impact-plan/model';

export function PlanResult({
  plan,
  onEdit,
  onReset,
}: {
  plan: Plan;
  onEdit: () => void;
  onReset: () => void;
}) {
  const summary = [
    ['Participation style', participationLabels[plan.participation]],
    ['Selected causes', plan.causes.join(', ')],
    ['Funding behavior', fundingDescription(plan)],
    ['Repayment behavior', repaymentLabels[plan.repayment]],
    ['Location preference', plan.location],
    [
      'Borrower gender preference',
      plan.gender === 'any'
        ? 'Any gender'
        : plan.gender === 'women'
          ? 'Women'
          : 'Men',
    ],
  ];
  return (
    <>
      <div className="result-intro">
        <span className="eyebrow">Your choices, connected</span>
        <h1 tabIndex={-1} id="plan-heading">
          Here’s how your $25 could move.
        </h1>
        <p>
          An illustrative journey based on your plan. No lending or automation
          is activated.
        </p>
      </div>
      <ol className="money-flow" aria-label="Example $25 money lifecycle">
        {moneyFlow(plan).map((stage, index) => (
          <li key={stage.title}>
            <span className="flow-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2>{stage.title}</h2>
            <p>{stage.description}</p>
            {index < 4 && (
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="risk-note">
        Lending involves risk of principal loss. Repayment is not guaranteed.
        This prototype does not move real money.
      </p>
      <SurfaceCard className="plan-summary">
        <div className="summary-heading">
          <h2>Your Impact Plan</h2>
          <span className="summary-tag">Demo only</span>
        </div>
        <dl>
          {summary.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="plan-actions">
          <SecondaryButton onClick={onEdit}>Edit plan</SecondaryButton>
          <button className="text-button" type="button" onClick={onReset}>
            Reset demo
          </button>
        </div>
      </SurfaceCard>
    </>
  );
}
