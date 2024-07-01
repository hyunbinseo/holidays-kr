import { deepEqual, doesNotThrow, equal, throws } from 'node:assert/strict';
import { test } from 'node:test';
import { array, integer, number, parse, pipe, regex, string, transform } from 'valibot';
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
	equal(latestKeys.length, 2);
	deepEqual(presetKeys.slice(-2), latestKeys);

	const [y0, y1] = latestKeys;

	equal(isHoliday(new Date(`${y1}-01-01T00:00:00+0900`)), true);
	equal(isHoliday(new Date(`${y1}-01-01T00:00:00+1000`)), false);

	throws(() => isHoliday(new Date(`${y0 - 1}-01-01T00:00:00+0900`)));
	throws(() => isHoliday(new Date(`${y1 + 1}-01-01T00:00:00+0900`)));

	doesNotThrow(() => isHoliday(new Date(`${y0}-01-01T00:00:00+0900`)));
	doesNotThrow(() => isHoliday(new Date(`${y1}-01-01T00:00:00+0900`)));

	deepEqual(getHolidayNames(new Date(`${y1}-03-01T00:00:00+0900`)), ['3ㆍ1절']);
	equal(getHolidayNames(new Date(`${y1}-03-02T00:00:00+0900`)), null);
});

test('presets', () => {
	equal('2025-01-01' in y2025, true);
	equal('2025-01-02' in y2025, false);
	equal('2024-01-01' in y2025, false);
	equal('2024-01-01' in y2024, true);
});
