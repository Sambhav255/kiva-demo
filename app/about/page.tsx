import { SurfaceCard } from '@/components/common/SurfaceCard';
import { SecondaryButton } from '@/components/common/Buttons';
export default function AboutPage() {
  return (
    <div className="narrow-page about-page">
      <span className="eyebrow">Independent product exploration</span>
      <h1>About this concept</h1>
      <p className="intro">
        Kiva already gives lenders several ways to lend, add money, automate
        activity, reuse repayments, and support causes. This concept explores
        whether those decisions could be easier to understand if they lived
        inside one Impact Plan.
      </p>
      <SurfaceCard>
        <h2>The product has several money controls</h2>
        <p>
          Manual lending, Auto Deposit, Auto Lending, Monthly Good, repayment
          settings, and Giving Funds each solve useful problems. A lender may
          still need to visit several places to understand what will happen to
          money over time.
        </p>
        <h2>Make the money lifecycle visible</h2>
        <p>
          If users can define participation style, priorities, funding, and
          repayment behavior in one place, they may feel more confident using
          Kiva repeatedly without losing control.
        </p>
        <h2>What this prototype does not assume</h2>
        <p>
          This prototype does not claim that the current experience is causing
          measurable confusion. Confirming the problem would require Kiva user
          research, funnel data, support data, and behavior data.
        </p>
        <h2>Preview scope</h2>
        <p>
          This build covers Milestones 0–2: the design foundation and new lender
          home. Setup, saved plans, money flow review, and demo reset will
          arrive in later milestones.
        </p>
      </SurfaceCard>
      <p className="about-disclaimer">
        This is an independent product concept. It is not produced or endorsed
        by Kiva and does not connect to a real Kiva account.
      </p>
      <SecondaryButton href="/">Back to prototype</SecondaryButton>
    </div>
  );
}
