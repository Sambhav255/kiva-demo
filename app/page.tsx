import { SurfaceCard } from '@/components/common/SurfaceCard';
import { PrimaryButton } from '@/components/common/Buttons';
export default function HomePage() {
  return (
    <section className="context-page" aria-labelledby="context-heading">
      <span className="eyebrow">One plan. A clearer money journey.</span>
      <h1 id="context-heading">Your impact, on your terms.</h1>
      <p className="context-intro">
        A proposed feature that connects borrower choice, priorities, and
        repayments in one understandable plan.
      </p>
      <SurfaceCard className="entry-card">
        <span className="entry-number" aria-hidden="true">
          01
        </span>
        <h2>Set your Impact Plan</h2>
        <p>
          Decide how involved you want to be and what should happen when money
          comes back.
        </p>
        <PrimaryButton href="/impact-plan">
          Set my plan <span aria-hidden="true">→</span>
        </PrimaryButton>
        <span className="entry-note">
          3 short steps · An example, never a transaction
        </span>
      </SurfaceCard>
    </section>
  );
}
