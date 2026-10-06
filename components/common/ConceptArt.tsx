import {
  BookOpen,
  Sprout,
  Store,
  Route,
  HeartHandshake,
  CircleDollarSign,
} from 'lucide-react';
const icons = {
  education: BookOpen,
  agriculture: Sprout,
  enterprise: Store,
  plan: Route,
  community: HeartHandshake,
  money: CircleDollarSign,
};
export type Artwork = keyof typeof icons;
export function ConceptArt({
  kind,
  compact = false,
}: {
  kind: Artwork;
  compact?: boolean;
}) {
  const Icon = icons[kind];
  return (
    <div
      aria-hidden="true"
      className={`concept-art art-${kind} ${compact ? 'art-compact' : ''}`}
    >
      <div className="art-orbit" />
      <div className="art-circle">
        <Icon size={compact ? 38 : 62} strokeWidth={1.3} />
      </div>
      <span className="art-leaf leaf-one" />
      <span className="art-leaf leaf-two" />
    </div>
  );
}
