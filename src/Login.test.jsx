import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./firebase', () => ({ auth: {}, googleProvider: {} }));
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn()
}));

describe('Login', () => {
  it('shows email and password boxes', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('switches to register mode', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.click(screen.getByText('Need an account? Register'));
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });
});