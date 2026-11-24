import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './BookDetails';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn(() => new Promise(() => {}));

describe('BookDetails', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/book/works/OL123W']}>
        <Routes>
          <Route path="/book/*" element={<BookDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });
});