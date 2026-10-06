import { describe, expect, it } from 'vitest';
import { staticLoanProvider } from '@/lib/loans/static-provider';
describe('local loan provider', () => {
  it('returns three distinctly identified demo fixtures without remote assets', async () => {
    const results = await staticLoanProvider.getHomeLoans();
    expect(results).toHaveLength(3);
    expect(new Set(results.map((loan) => loan.id)).size).toBe(3);
    expect(
      results.every(
        (loan) => loan.id.startsWith('demo-') && loan.causes.length > 0,
      ),
    ).toBe(true);
  });
  it('limits fixture results without mutating the source', async () => {
    expect(await staticLoanProvider.getHomeLoans(1)).toHaveLength(1);
    expect(await staticLoanProvider.getHomeLoans(0)).toHaveLength(0);
    expect(await staticLoanProvider.getHomeLoans(-1)).toHaveLength(0);
    expect(await staticLoanProvider.getHomeLoans()).toHaveLength(3);
  });
});
