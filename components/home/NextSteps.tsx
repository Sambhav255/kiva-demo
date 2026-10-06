import { ArrowRight } from 'lucide-react';
import { SurfaceCard } from '@/components/common/SurfaceCard';
import { ConceptArt } from '@/components/common/ConceptArt';
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons';
export function NextSteps() {
  return (
    <section aria-labelledby="next-steps-heading" className="home-section">
      <div className="section-heading">
        <h2 id="next-steps-heading">Next steps recommended for you</h2>
        <span className="section-note">
          A little direction. A lasting habit.
        </span>
      </div>
      <div className="card-grid next-steps">
        <SurfaceCard className="next-card plan-entry">
          <span className="eyebrow">A plan for your impact</span>
          <ConceptArt kind="plan" compact />
          <h3>Set your Impact Plan</h3>
          <p>
            Choose what matters to you and what should happen when money comes
            back.
          </p>
          <PrimaryButton href="/impact-plan">
            Set plan <ArrowRight size={17} aria-hidden="true" />
          </PrimaryButton>
        </SurfaceCard>
        <SurfaceCard className="next-card">
          <span className="eyebrow">Start with one borrower</span>
          <ConceptArt kind="community" compact />
          <h3>Small loans. New possibilities.</h3>
          <p>
            Meet a few borrower examples and see the kinds of goals a loan can
            support.
          </p>
          <SecondaryButton href="#borrowers">Explore borrowers</SecondaryButton>
        </SurfaceCard>
        <SurfaceCard className="next-card">
          <span className="eyebrow">Understand the journey</span>
          <ConceptArt kind="money" compact />
          <h3>See how lending works</h3>
          <p>
            Lending capital supports borrowers. Donations to Kiva support its
            nonprofit work.
          </p>
          <SecondaryButton href="/about">
            Learn about this concept
          </SecondaryButton>
        </SurfaceCard>
      </div>
    </section>
  );
}
