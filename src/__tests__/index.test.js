// src/__tests__/index.test.js

import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('Home', () => {
  it('renders a heading', () => {
    useSession.mockReturnValueOnce({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });

    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
