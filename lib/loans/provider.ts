import type { LoanSummary } from '@/data/loans';
// Home fixtures only for now. Plan matching is introduced in Milestone 9.
export interface LoanProvider {
  readonly sourceLabel: string;
  getHomeLoans(limit?: number): Promise<readonly LoanSummary[]>;
}
