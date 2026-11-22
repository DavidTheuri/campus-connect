import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from './AuthContext';
import { vi, describe, it, expect } from 'vitest';

vi.mock('./AuthContext', () => ({ useAuth: vi.fn() }));

describe('ProtectedRoute', () => {
  it('shows the page when logged in', () => {
    useAuth.mockReturnValue({ user: { email: 'a@b.com' }, loading: false });
    render(<MemoryRouter><ProtectedRoute><div>Secret</div></ProtectedRoute></MemoryRouter>);
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });

  it('hides the page when logged out', () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    render(<MemoryRouter><ProtectedRoute><div>Secret</div></ProtectedRoute></MemoryRouter>);
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });
});