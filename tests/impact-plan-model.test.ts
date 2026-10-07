import { describe, expect, it } from 'vitest';
import {
  completePlan,
  createDraft,
  fundingDescription,
  moneyFlow,
  parsePlan,
  validateDraft,
  type Draft,
  type Funding,
  type Participation,
  type Repayment,
} from '@/lib/impact-plan/model';

const validDraft = (overrides: Partial<Draft> = {}): Draft => ({
  ...createDraft(),
  participation: 'guided',
  causes: ['Education', 'Women'],
  ...overrides,
});

describe('Impact Plan model', () => {
  it('keeps repayment-only funding under the chosen repayment control even in automatic mode', () => {
    const plan = completePlan(
      validDraft({ participation: 'automatic', funding: 'repayments_only' }),
    )!;
    expect(moneyFlow(plan)[1].description).toContain('Returned money waits');
    expect(moneyFlow(plan)[2].description).toContain(
      'Only after your decision',
    );
    expect(
      moneyFlow({ ...plan, repayment: 'recommend' })[1].description,
    ).toContain('You choose the borrower; nothing is relended automatically');
    expect(
      moneyFlow({ ...plan, repayment: 'auto_relend' })[1].description,
    ).toContain('select a borrower automatically');
  });
  it('requires an intentional participation choice and at least one cause', () => {
    expect(completePlan(createDraft())).toBeNull();
    expect(validateDraft(validDraft({ causes: [] }))).toContain('cause');
  });

  it('normalizes monthly amounts, removes duplicates, and copies editing state', () => {
    const plan = completePlan(
      validDraft({
        funding: 'monthly',
        monthlyAmount: ' 25.50 ',
        causes: ['Education', 'Education'],
      }),
    );
    expect(plan?.monthlyAmount).toBe(25.5);
    expect(plan?.causes).toEqual(['Education']);
    const draft = createDraft(plan!);
    draft.causes.push('Women');
    expect(plan?.causes).toEqual(['Education']);
    expect(createDraft(plan!).monthlyAmount).toBe('25.5');
    expect(
      completePlan(validDraft({ monthlyAmount: 'invalid' }))?.monthlyAmount,
    ).toBeNull();
  });

  it.each(['', '0', '-1', 'abc', 'Infinity', '1e3', '25.001', '1000000.01'])(
    'rejects invalid monthly amount %s',
    (monthlyAmount) => {
      expect(
        completePlan(validDraft({ funding: 'monthly', monthlyAmount })),
      ).toBeNull();
    },
  );

  it('allows every coherent combination and rejects manual automatic relending', () => {
    const participations: Participation[] = ['manual', 'guided', 'automatic'];
    const fundings: Funding[] = ['manual', 'monthly', 'repayments_only'];
    const repayments: Repayment[] = ['balance', 'recommend', 'auto_relend'];
    for (const participation of participations) {
      for (const funding of fundings) {
        for (const repayment of repayments) {
          const draft = validDraft({ participation, funding, repayment });
          const isConflict =
            participation === 'manual' && repayment === 'auto_relend';
          expect(completePlan(draft) === null).toBe(isConflict);
          if (isConflict)
            expect(validateDraft(draft)).toContain('every borrower');
          else
            expect(parsePlan(JSON.stringify(completePlan(draft)))).toEqual(
              completePlan(draft),
            );
        }
      }
    }
  });

  it('rejects corrupted, unsupported, contradictory and unknown stored choices', () => {
    const plan = completePlan(validDraft())!;
    const invalid = [
      null,
      '',
      '{bad json}',
      'null',
      '[]',
      '{}',
      ...[
        { ...plan, version: 2 },
        { ...plan, participation: 'ai' },
        { ...plan, causes: ['Unknown'] },
        { ...plan, causes: [] },
        { ...plan, causes: 'Education' },
        { ...plan, location: 'Unknown' },
        { ...plan, gender: 'Unknown' },
        { ...plan, funding: 'Unknown' },
        { ...plan, repayment: 'Unknown' },
        { ...plan, participation: 'manual', repayment: 'auto_relend' },
        { ...plan, funding: 'monthly', monthlyAmount: null },
        { ...plan, funding: 'monthly', monthlyAmount: '25' },
        { ...plan, funding: 'monthly', monthlyAmount: 0 },
        { ...plan, funding: 'monthly', monthlyAmount: 25.001 },
        { ...plan, monthlyAmount: 25 },
      ].map((value) => JSON.stringify(value)),
    ];
    for (const value of invalid) expect(parsePlan(value)).toBeNull();
  });

  it('excludes unrecognized storage fields instead of propagating them', () => {
    const plan = completePlan(validDraft())!;
    expect(
      parsePlan(JSON.stringify({ ...plan, accountToken: 'unused' })),
    ).toEqual(plan);
  });

  it('describes monthly contributions and makes repayment-only funding explicit', () => {
    const monthly = completePlan(
      validDraft({ funding: 'monthly', monthlyAmount: '10' }),
    )!;
    expect(fundingDescription(monthly)).toBe('Add $10.00 monthly');
    expect(moneyFlow(monthly)[0].description).toContain(
      'accumulated across contributions',
    );
    const reused = completePlan(validDraft({ funding: 'repayments_only' }))!;
    expect(moneyFlow(reused)[0].title).toBe('$25 returns to Kiva');
    expect(moneyFlow(reused)[0].description).toContain('No new money is added');
  });

  it('explains borrower selection preferences, risk, and who controls returned money', () => {
    const plan = completePlan(
      validDraft({
        participation: 'automatic',
        location: 'Asia',
        gender: 'women',
      }),
    )!;
    const flow = moneyFlow(plan);
    expect(flow).toHaveLength(5);
    expect(flow[1].description).toContain(
      'Education, Women · Asia · women borrowers',
    );
    expect(flow[3].description).toContain('Repayment is not guaranteed');
    expect(flow[4].description).toContain('returned repayments wait');
    expect(
      moneyFlow({ ...plan, repayment: 'recommend' })[4].description,
    ).toContain('repayment matches require your choice');
    expect(
      moneyFlow({ ...plan, repayment: 'auto_relend' })[4].description,
    ).toContain('automatically lend again');
    expect(
      moneyFlow({ ...plan, participation: 'manual' })[1].description,
    ).toContain('You choose every borrower');
    expect(
      moneyFlow({ ...plan, participation: 'guided' })[1].description,
    ).toContain('You choose the borrower');
  });
});
