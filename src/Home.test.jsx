import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./AuthContext', () => ({ useAuth: () => ({ user: null }) }));

vi.mock('./firebase', () => ({
  db: {},
  auth: { currentUser: null }
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
  addDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  increment: vi.fn()
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn()
}));

describe('Home', () => {
  it('renders the feed page for a guest', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    expect(screen.getByText('Campus Connect')).toBeInTheDocument();
    // Notice we check for the guest placeholder text now
    expect(screen.getByPlaceholderText('Log in to share something...')).toBeInTheDocument();
  });
});