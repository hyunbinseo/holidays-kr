import { describe, expect, it } from 'vitest';
import { toISODate } from './utils.ts';

describe('toISODate', () => {
	it('returns the string as-is for a valid ISO date string', () => {
		expect(toISODate('2026-01-01')).toBe('2026-01-01');
	});

	it('throws TypeError for an invalid date string', () => {
		expect(() => toISODate('not-a-date')).toThrow(TypeError);
	});

	it('returns the KST date string for a valid Date', () => {
		expect(toISODate(new Date('2026-01-01T00:00:00+0900'))).toBe('2026-01-01');
	});

	it('throws RangeError for an invalid Date', () => {
		expect(() => toISODate(new Date('invalid'))).toThrow(RangeError);
	});
});
