import { describe, expect, it } from 'vitest';
import { getHolidayNames, isHoliday } from './index.ts';

describe('isHoliday', () => {
	it('returns true for a KST holiday', async () => {
		await expect(isHoliday(new Date('2026-01-01T00:00:00+0900'))).resolves.toBe(true);
	});

	it('returns false for a non-holiday', async () => {
		await expect(isHoliday(new Date('2026-01-02T00:00:00+0900'))).resolves.toBe(false);
	});

	it('throws RangeError for a year with no preset', async () => {
		await expect(isHoliday(new Date('2999-01-01T00:00:00+0900'))).rejects.toThrow(RangeError);
	});
});

describe('getHolidayNames', () => {
	it('returns names for a holiday', async () => {
		await expect(getHolidayNames(new Date('2026-03-01T00:00:00+0900'))).resolves.toEqual([
			'3ㆍ1절',
		]);
	});

	it('returns null for a non-holiday', async () => {
		await expect(getHolidayNames(new Date('2026-12-31T00:00:00+0900'))).resolves.toBeNull();
	});
});
