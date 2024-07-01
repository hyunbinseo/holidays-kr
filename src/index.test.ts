import { array, integer, number, parse, pipe, regex, string, transform } from 'valibot';
import { expect, test } from 'vitest';
import * as latest from './holidays/latest.js';
import * as presets from './holidays/presets.js';
import { getHolidayNames, isHoliday, y2024, y2025 } from './index.js';

const KeysSchema = array(
	pipe(
		string(),
		regex(/^y2\d{3}$/),
		transform((v) => Number(v.substring(1))),
		number(),
		integer(),
	),
);

const latestKeys = parse(KeysSchema, Object.keys(latest));
const presetKeys = parse(KeysSchema, Object.keys(presets));

test('functions', () => {
	expect(latestKeys.length).toEqual(2);
	expect(presetKeys.slice(-2)).toEqual(latestKeys);

	const [y0, y1] = latestKeys;

	expect(isHoliday(new Date(`${y1}-01-01T00:00:00+0900`))).toBe(true);
	expect(isHoliday(new Date(`${y1}-01-01T00:00:00+1000`))).toBe(false);

	expect(() => isHoliday(new Date(`${y0 - 1}-01-01T00:00:00+0900`))).toThrowError();
	expect(() => isHoliday(new Date(`${y0}-01-01T00:00:00+0900`))).not.toThrowError();
	expect(() => isHoliday(new Date(`${y1}-01-01T00:00:00+0900`))).not.toThrowError();
	expect(() => isHoliday(new Date(`${y1 + 1}-01-01T00:00:00+0900`))).toThrowError();

	expect(getHolidayNames(new Date(`${y1}-03-01T00:00:00+0900`))).toEqual(['3ㆍ1절']);
	expect(getHolidayNames(new Date(`${y1}-03-02T00:00:00+0900`))).toBeNull();
});

test('presets', () => {
	expect('2025-01-01' in y2025).toBe(true);
	expect('2025-01-02' in y2025).toBe(false);
	expect('2024-01-01' in y2025).toBe(false);
	expect('2024-01-01' in y2024).toBe(true);
});
