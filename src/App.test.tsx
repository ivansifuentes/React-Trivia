import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { decodeEntities } from './lib/utils';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('sums correctly', () => {
  expect(3+4).toBe(7);
});

test('decodeEntities', () => {
  const originalStr = 'werewrwe';
  const decoded = decodeEntities(originalStr);
  expect(decoded).toBe('werewrwe');
});

test('same thingy', () => {
  const frontEnd = 'https://www.ondemandassessment.com/link/index/JB-LTF35P4LP?u=1035005';
  const backEnd = 'https://www.ondemandassessment.com/link/index/JB-LTF35P4LP?u=1035005';
  expect(frontEnd).toBe(backEnd);
});