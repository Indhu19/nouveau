import { describe, it, expect } from 'vitest';
import { getInitials } from '@/lib/utils.ts';


describe('getInitials', () => {
  it('returns initials for single word', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  it('returns initials for two words', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('handles extra spaces', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD');
  });

  it('handles lowercase names', () => {
    expect(getInitials('jane doe')).toBe('JD');
  });

  it('handles more than two words', () => {
    expect(getInitials('Mary Ann Smith')).toBe('MAS');
  });

  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });
});
