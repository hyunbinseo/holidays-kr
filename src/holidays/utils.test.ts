import { describe, expect, it } from 'vitest';
import { toKSTISODate } from './utils.ts';

describe('toKSTISODate', () => {
	it.each(['2026-01-01', '2026-12-31', '2024-02-29'])('returns %s as-is', (input) => {
		expect(toKSTISODate(input)).toBe(input);
	});

	it.each([
		'not-a-date',
		'2026-1-1',
		'2026-13-01',
		'2026-01-32',
		'2026-02-30',
		'2026-04-31',
		'2025-02-29',
		'2026-01-01T00:00:00',
	])('throws TypeError for %s', (input) => {
		expect(() => toKSTISODate(input)).toThrow(TypeError);
	});

	it.each([
		['2026-01-01T00:00:00+0900', '2026-01-01'],
		['2025-12-31T15:00:00Z', '2026-01-01'],
		['2025-12-31T14:59:59Z', '2025-12-31'],
	])('returns the KST date for %s', (input, expected) => {
		expect(toKSTISODate(new Date(input))).toBe(expected);
	});

	it('throws RangeError for an invalid Date', () => {
		expect(() => toKSTISODate(new Date('invalid'))).toThrow(RangeError);
	});

	it('throws for a non-Date, non-string input', () => {
		expect(() => toKSTISODate(1 as never)).toThrow();
	});
});
