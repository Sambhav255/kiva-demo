'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { LoanSummary } from '@/data/loans';
import { ConceptArt } from './ConceptArt';
import { SurfaceCard } from './SurfaceCard';
import { PrimaryButton } from './Buttons';
export function LoanCard({ loan }: { loan: LoanSummary }) {
  const [message, setMessage] = useState(false);
  return (
    <SurfaceCard className="loan-card">
      <div className="loan-art">
        <ConceptArt kind={loan.artwork} />
        <span className="location-pill">
          <MapPin size={12} aria-hidden="true" />
          {loan.location}
        </span>
        <span className="fixture-label">Demo example</span>
      </div>
      <div className="loan-body">
        <h3>{loan.name}</h3>
        <p>{loan.purpose}</p>
        <ul className="cause-tags" aria-label="Causes">
          {loan.causes.map((cause) => (
            <li key={cause}>{cause}</li>
          ))}
        </ul>
        <div className="loan-action">
          <div>
            <strong>
              ${loan.amountRemaining.toLocaleString('en-US')} to go
            </strong>
            <span className="funding-track" aria-hidden="true">
              <span />
            </span>
          </div>
          <PrimaryButton
            onClick={() => setMessage(true)}
            aria-label={`Demo lend to ${loan.name}`}
          >
            Demo lend
          </PrimaryButton>
        </div>
        <p role="status" className="loan-status">
          {message
            ? 'Prototype only. No loan will be placed.'
            : 'Illustrative funding amount.'}
        </p>
      </div>
    </SurfaceCard>
  );
}
