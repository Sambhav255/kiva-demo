export const CAUSES = [
  'Women',
  'Education',
  'Climate',
  'Entrepreneurs',
  'Refugees',
  'Agriculture',
] as const;
export const LOCATIONS = [
  'Anywhere',
  'Africa',
  'Asia',
  'Latin America',
  'United States',
] as const;

export type Cause = (typeof CAUSES)[number];
export type Location = (typeof LOCATIONS)[number];
export type Participation = 'manual' | 'guided' | 'automatic';
export type Funding = 'manual' | 'monthly' | 'repayments_only';
export type Repayment = 'balance' | 'recommend' | 'auto_relend';
export type Gender = 'any' | 'women' | 'men';

export interface Plan {
  version: 1;
  participation: Participation;
  causes: Cause[];
  location: Location;
  gender: Gender;
  funding: Funding;
  monthlyAmount: number | null;
  repayment: Repayment;
}
export type Draft = Omit<Plan, 'participation' | 'monthlyAmount'> & {
  participation: '' | Participation;
  monthlyAmount: string;
};

export const participationLabels: Record<Participation, string> = {
  manual: 'Choose every borrower',
  guided: 'Show me a short list',
  automatic: 'Lend for me based on my preferences',
};
export const fundingLabels: Record<Funding, string> = {
  manual: 'I will add money when I want',
  monthly: 'Add a set amount monthly',
  repayments_only: 'Only reuse repayments',
};
export const repaymentLabels: Record<Repayment, string> = {
  balance: 'Return to my available balance',
  recommend: 'Show me new matches',
  auto_relend: 'Relend automatically based on this plan',
};

const participations = ['manual', 'guided', 'automatic'] as const;
const fundings = ['manual', 'monthly', 'repayments_only'] as const;
const repayments = ['balance', 'recommend', 'auto_relend'] as const;
const genders = ['any', 'women', 'men'] as const;

function contains<T extends string>(
  values: readonly T[],
  value: unknown,
): value is T {
  return typeof value === 'string' && values.includes(value as T);
}

export function createDraft(plan?: Plan): Draft {
  return {
    version: 1,
    participation: plan?.participation ?? '',
    causes: [...(plan?.causes ?? [])],
    location: plan?.location ?? 'Anywhere',
    gender: plan?.gender ?? 'any',
    funding: plan?.funding ?? 'manual',
    monthlyAmount: String(plan?.monthlyAmount ?? 25),
    repayment: plan?.repayment ?? 'balance',
  };
}

export function validateDraft(draft: Draft): string | null {
  if (!contains(participations, draft.participation)) {
    return 'Choose how involved you want to be.';
  }
  if (
    !Array.isArray(draft.causes) ||
    draft.causes.length === 0 ||
    draft.causes.some((cause) => !contains(CAUSES, cause))
  ) {
    return 'Choose at least one of the listed causes.';
  }
  if (
    !contains(LOCATIONS, draft.location) ||
    !contains(genders, draft.gender)
  ) {
    return 'Choose a listed location and borrower gender preference.';
  }
  if (
    !contains(fundings, draft.funding) ||
    !contains(repayments, draft.repayment)
  ) {
    return 'Choose how money enters and what happens when it returns.';
  }
  if (draft.participation === 'manual' && draft.repayment === 'auto_relend') {
    return 'Choosing every borrower means repayments cannot be relended automatically. Choose balance or new matches, or change your participation style.';
  }
  if (
    draft.funding === 'monthly' &&
    (typeof draft.monthlyAmount !== 'string' ||
      !/^\d+(?:\.\d{1,2})?$/.test(draft.monthlyAmount.trim()) ||
      Number(draft.monthlyAmount) <= 0 ||
      Number(draft.monthlyAmount) > 1_000_000)
  ) {
    return 'Enter a monthly amount above $0 and up to $1,000,000, with no more than two decimal places.';
  }
  return null;
}

export function completePlan(draft: Draft): Plan | null {
  if (validateDraft(draft) !== null || draft.participation === '') return null;
  return {
    version: 1,
    participation: draft.participation,
    causes: [...new Set(draft.causes)],
    location: draft.location,
    gender: draft.gender,
    funding: draft.funding,
    monthlyAmount:
      draft.funding === 'monthly' ? Number(draft.monthlyAmount) : null,
    repayment: draft.repayment,
  };
}

export function parsePlan(raw: string | null): Plan | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return null;
    }
    const plan = value as Record<string, unknown>;
    if (
      plan.version !== 1 ||
      !contains(participations, plan.participation) ||
      !Array.isArray(plan.causes) ||
      !plan.causes.every((cause) => contains(CAUSES, cause)) ||
      !contains(LOCATIONS, plan.location) ||
      !contains(genders, plan.gender) ||
      !contains(fundings, plan.funding) ||
      !contains(repayments, plan.repayment) ||
      (plan.funding === 'monthly'
        ? typeof plan.monthlyAmount !== 'number' ||
          !Number.isFinite(plan.monthlyAmount)
        : plan.monthlyAmount !== null)
    ) {
      return null;
    }
    return completePlan({
      version: 1,
      participation: plan.participation,
      causes: plan.causes as Cause[],
      location: plan.location,
      gender: plan.gender,
      funding: plan.funding,
      monthlyAmount: String(plan.monthlyAmount ?? 25),
      repayment: plan.repayment,
    });
  } catch {
    return null;
  }
}

const dollars = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);

export function fundingDescription(plan: Plan): string {
  return plan.funding === 'monthly'
    ? `Add ${dollars(plan.monthlyAmount ?? 25)} monthly`
    : fundingLabels[plan.funding];
}

export function moneyFlow(
  plan: Plan,
): { title: string; description: string }[] {
  const preferences = [
    plan.causes.join(', '),
    plan.location === 'Anywhere' ? 'any location' : plan.location,
    plan.gender === 'any' ? 'any borrower gender' : `${plan.gender} borrowers`,
  ].join(' · ');
  const entry = {
    manual: 'You add $25 when you decide to lend. No recurring deposit is set.',
    monthly: `Your illustrative ${dollars(plan.monthlyAmount ?? 25)} monthly contribution adds money. Follow $25 from the resulting balance, accumulated across contributions if needed. No payment is scheduled.`,
    repayments_only:
      'An example $25 already repaid from earlier loans becomes available again. No new money is added; without repayments, the plan waits.',
  }[plan.funding];
  const repaymentControlled =
    plan.participation === 'automatic' &&
    plan.funding === 'repayments_only' &&
    plan.repayment !== 'auto_relend';
  const selection = repaymentControlled
    ? plan.repayment === 'balance'
      ? `Returned money waits in your balance. If you choose to use it, borrower selection follows your preferences: ${preferences}.`
      : `For returned money, Kiva would show matches based on ${preferences}. You choose the borrower; nothing is relended automatically.`
    : {
        manual: `You choose every borrower, using your priorities: ${preferences}.`,
        guided: `Kiva would show a short list based on ${preferences}. You choose the borrower.`,
        automatic: `Kiva would select a borrower automatically based on ${preferences}. No real automation is active.`,
      }[plan.participation];
  const next = {
    balance:
      'Repaid funds wait in your available balance until you decide what to do next.' +
      (plan.participation === 'automatic'
        ? plan.funding === 'repayments_only'
          ? ' With no new deposits, this plan waits for your decision.'
          : ' Only new funds would follow automatic borrower selection; returned repayments wait.'
        : ''),
    recommend:
      'Kiva would show new matches when repayments return. You choose the next borrower before money is lent again.' +
      (plan.participation === 'automatic'
        ? plan.funding === 'repayments_only'
          ? ' There are no new deposits; repayment matches require your choice.'
          : ' Automatic selection applies to new funds; repayment matches require your choice.'
        : ''),
    auto_relend:
      'As repayments become available, Kiva would automatically lend again to borrowers matching this plan. No real relending occurs.',
  }[plan.repayment];
  return [
    {
      title:
        plan.funding === 'repayments_only'
          ? '$25 returns to Kiva'
          : '$25 enters Kiva',
      description: entry,
    },
    { title: 'Borrower selection', description: selection },
    {
      title: 'Loan funded',
      description: repaymentControlled
        ? 'Only after your decision could the $25 fund a loan. Until then, it waits. This demo does not fund a loan.'
        : 'In this example, $25 contributes to the selected borrower’s loan. This demo does not fund a loan.',
    },
    {
      title: 'Borrower repayment',
      description:
        'If the borrower repays, funds return over time. Repayment is not guaranteed; principal loss is possible.',
    },
    { title: 'Your next action', description: next },
  ];
}
