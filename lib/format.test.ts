import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$ 0');
  });

  it('formats standard positive numbers correctly', () => {
    expect(formatPrice(1500)).toBe('$ 1.500');
  });

  it('formats large numbers with thousands separators correctly', () => {
    expect(formatPrice(1000000)).toBe('$ 1.000.000');
  });

  it('truncates/rounds decimals without fractions', () => {
    expect(formatPrice(1234.56)).toBe('$ 1.235');
  });

  it('formats negative numbers correctly', () => {
    expect(formatPrice(-500)).toBe('-$ 500');
  });

  it('has correct spacing between $ and the number', () => {
    const formatted = formatPrice(1500);
    expect(formatted.startsWith('$ ')).toBe(true);
    expect(formatted).toBe('$ 1.500');
  });
});
