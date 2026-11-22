import React from 'react';
import { render, screen } from '@testing-library/react';
import Books from './Books';
import { describe, it, expect } from 'vitest';

describe('Books', () => {
  it('shows the search box', () => {
    render(<Books />);
    expect(screen.getByPlaceholderText('Search books...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});