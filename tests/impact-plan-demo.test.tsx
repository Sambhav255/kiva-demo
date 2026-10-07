import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { ImpactPlanDemo } from '@/components/impact-plan/ImpactPlanDemo';
import { STORAGE_KEY } from '@/lib/impact-plan/storage';
function next() {
  fireEvent.click(screen.getByRole('button', { name: /Continue/ }));
}
function participation(name = 'Show me a short list') {
  fireEvent.click(screen.getByRole('radio', { name: new RegExp(name) }));
  next();
}
function causes() {
  fireEvent.click(screen.getByRole('checkbox', { name: 'Women' }));
  fireEvent.click(screen.getByRole('checkbox', { name: 'Climate' }));
  next();
}
function finish() {
  fireEvent.click(screen.getByRole('button', { name: /See my Impact Plan/ }));
}
function summary() {
  return within(
    screen
      .getByRole('heading', { name: 'Your Impact Plan' })
      .closest('section')!,
  );
}
beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());
describe('Impact Plan demo', () => {
  it('connects guided preferences to a persisted lifecycle, editing and scoped reset', () => {
    localStorage.setItem('another-demo', 'keep me');
    const view = render(<ImpactPlanDemo />);
    participation();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Women' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Climate' }));
    fireEvent.change(screen.getByRole('combobox', { name: /Location/ }), {
      target: { value: 'Africa' },
    });
    fireEvent.change(
      screen.getByRole('combobox', { name: /Borrower gender/ }),
      { target: { value: 'women' } },
    );
    next();
    fireEvent.click(screen.getByRole('radio', { name: /Show me new matches/ }));
    finish();
    expect(summary().getByText('Women, Climate')).toBeVisible();
    expect(summary().getByText('Africa')).toBeVisible();
    const flow = within(
      screen.getByRole('list', { name: 'Example $25 money lifecycle' }),
    );
    expect(
      flow.getByText(
        /short list based on Women, Climate · Africa · women borrowers/,
      ),
    ).toBeVisible();
    expect(
      flow.getByText(/You choose the next borrower before money is lent again/),
    ).toBeVisible();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
      participation: 'guided',
      causes: ['Women', 'Climate'],
      gender: 'women',
      repayment: 'recommend',
    });
    view.unmount();
    render(<ImpactPlanDemo />);
    expect(
      screen.getByRole('heading', { name: 'Your Impact Plan' }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Edit plan' }));
    expect(
      screen.getByRole('radio', { name: /Show me a short list/ }),
    ).toBeChecked();
    next();
    expect(screen.getByRole('checkbox', { name: 'Climate' })).toBeChecked();
    next();
    finish();
    fireEvent.click(screen.getByRole('button', { name: 'Reset demo' }));
    expect(
      screen.getByRole('heading', { name: 'How involved do you want to be?' }),
    ).toBeVisible();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem('another-demo')).toBe('keep me');
  });
  it('requires participation and a cause without persisting unfinished choices', () => {
    render(<ImpactPlanDemo />);
    next();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Choose how involved you want to be.',
    );
    participation();
    next();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Choose at least one cause.',
    );
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
  it('normalizes automatic relending when editing participation to manual', () => {
    render(<ImpactPlanDemo />);
    participation('Lend for me based on my preferences');
    causes();
    fireEvent.click(
      screen.getByRole('radio', {
        name: /Relend automatically based on this plan/,
      }),
    );
    finish();
    fireEvent.click(screen.getByRole('button', { name: 'Edit plan' }));
    participation('Choose every borrower');
    next();
    expect(
      screen.getByRole('radio', {
        name: /Relend automatically based on this plan/,
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole('radio', { name: /Return to my available balance/ }),
    ).toBeChecked();
    expect(
      screen.getByText(/Choosing every borrower keeps you in control/),
    ).toBeVisible();
    finish();
    expect(summary().getByText('Choose every borrower')).toBeVisible();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
      participation: 'manual',
      repayment: 'balance',
    });
  });
  it('validates monthly amount and explains automatic selection with balance control', () => {
    render(<ImpactPlanDemo />);
    participation('Lend for me based on my preferences');
    causes();
    expect(
      screen.getByText(/Repayments wait in your available balance/),
    ).toBeVisible();
    fireEvent.click(
      screen.getByRole('radio', { name: /Add a set amount monthly/ }),
    );
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /Monthly amount/ }),
      { target: { value: '0' } },
    );
    finish();
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a monthly amount above $0',
    );
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    fireEvent.change(
      screen.getByRole('spinbutton', { name: /Monthly amount/ }),
      { target: { value: '40.50' } },
    );
    finish();
    expect(summary().getByText('Add $40.50 monthly')).toBeVisible();
    expect(
      screen.getByText(/Your illustrative \$40.50 monthly contribution/),
    ).toBeVisible();
    expect(
      screen.getByText(
        /Only new funds would follow automatic borrower selection/,
      ),
    ).toBeVisible();
  });
  it('recovers from corrupt storage and keeps the result usable when storage is unavailable', () => {
    localStorage.setItem(STORAGE_KEY, '{broken');
    render(<ImpactPlanDemo />);
    expect(
      screen.getByRole('heading', { name: 'How involved do you want to be?' }),
    ).toBeVisible();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    participation();
    causes();
    fireEvent.click(
      screen.getByRole('radio', { name: /Only reuse repayments/ }),
    );
    finish();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Browser storage is unavailable',
    );
    expect(
      screen.getByRole('heading', { name: 'Your Impact Plan' }),
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: '$25 returns to Kiva' }),
    ).toBeVisible();
    expect(
      screen.getByText(/without repayments, the plan waits/),
    ).toBeVisible();
  });
});
