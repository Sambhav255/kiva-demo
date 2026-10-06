export interface LoanSummary {
  id: string;
  name: string;
  location: string;
  purpose: string;
  causes: string[];
  amountRemaining: number;
  sector: string;
  artwork: 'education' | 'agriculture' | 'enterprise';
}
// Fictional, anonymous demo fixtures. These are not available Kiva loans.
export const loans: readonly LoanSummary[] = [
  {
    id: 'demo-education',
    name: 'A learning cooperative',
    location: 'Peru',
    purpose:
      'Help a community learning center purchase books and classroom supplies.',
    causes: ['Education', 'Entrepreneurs'],
    amountRemaining: 725,
    sector: 'Education',
    artwork: 'education',
  },
  {
    id: 'demo-agriculture',
    name: 'A small farming group',
    location: 'Kenya',
    purpose:
      'Help smallholder farmers purchase tools for their next growing season.',
    causes: ['Agriculture', 'Food'],
    amountRemaining: 450,
    sector: 'Agriculture',
    artwork: 'agriculture',
  },
  {
    id: 'demo-enterprise',
    name: 'A neighborhood maker',
    location: 'Philippines',
    purpose:
      'Help a local workshop purchase materials and grow a small business.',
    causes: ['Entrepreneurs', 'Arts'],
    amountRemaining: 875,
    sector: 'Arts',
    artwork: 'enterprise',
  },
];
