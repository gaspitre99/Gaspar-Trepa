import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should concatenate basic string classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should filter out conditional and falsy inputs', () => {
    expect(cn('class1', false && 'class2', null, undefined, 0, 'class3')).toBe('class1 class3');
  });

  it('should resolve tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('p-4', 'p-8', 'p-2')).toBe('p-2');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should handle objects with boolean values', () => {
    expect(cn({ class1: true, class2: false, class3: true })).toBe('class1 class3');
  });
});
