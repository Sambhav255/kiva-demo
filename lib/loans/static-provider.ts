import { loans } from '@/data/loans';
import type { LoanProvider } from './provider';
export const staticLoanProvider: LoanProvider = {
  sourceLabel: 'Illustrative borrower examples · local demo data',
  async getHomeLoans(limit = 3) {
    return loans.slice(0, Math.max(0, Math.floor(limit)));
  },
};
