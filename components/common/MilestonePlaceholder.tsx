import { SurfaceCard } from './SurfaceCard';
import { SecondaryButton } from './Buttons';
export function MilestonePlaceholder({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="narrow-page">
      <SurfaceCard className="placeholder-card">
        <span className="eyebrow">Concept preview · Milestones 0–2</span>
        <h1>{title}</h1>
        <p>{children}</p>
        <p className="muted">
          This screen is planned for a later milestone. No settings have been
          saved and no money will move.
        </p>
        <SecondaryButton href="/">Back to My impact</SecondaryButton>
      </SurfaceCard>
    </div>
  );
}
