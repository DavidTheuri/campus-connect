import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./firebase', () => ({ auth: {}, db: {}, googleProvider: {} }));
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ email: 'test@test.com' }); 
    return vi.fn();
  }),
  signOut: vi.fn()
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

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(true).toBe(true);
  });
});