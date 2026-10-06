import type { HTMLAttributes } from 'react';
export function SurfaceCard({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`surface-card ${className}`} {...props} />;
}
