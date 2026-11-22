import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { describe, it, expect, vi } from 'vitest';

// Mock Firebase so it doesn't try to connect
vi.mock('./firebase', () => ({
  db: {},
  auth: { currentUser: { email: 'test@test.com', uid: '123' } }
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()), // Pretend to listen but do nothing
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
  it('renders the feed page', () => {
    render(<Home />);
    expect(screen.getByText('Campus Connect')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Share something...')).toBeInTheDocument();
  });
});