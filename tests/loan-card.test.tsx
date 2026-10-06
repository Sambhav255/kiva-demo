import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LoanCard } from '@/components/common/LoanCard';
import { loans } from '@/data/loans';
describe('demo loan action', () => {
  it('announces that no loan will be placed', () => {
    render(<LoanCard loan={loans[0]} />);
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Demo lend to A learning cooperative',
      }),
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      'Prototype only. No loan will be placed.',
    );
  });
});
