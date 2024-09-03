import { deepEqual, doesNotThrow, equal, throws } from 'node:assert/strict';
import { test } from 'node:test';
import { array, integer, length, number, parse, pipe, regex, string, transform } from 'valibot';
import * as all from '../src/holidays/all.ts';
import * as latest from '../src/holidays/latest.js';
import { getHolidayNames, isHoliday, y2024, y2025 } from '../src/index.ts';

const PresetsKeySchema = array(
	pipe(
		string(),
		regex(/^y2\d{3}$/),
		transform((v) => Number(v.substring(1))),
		number(),
		integer(),
	),
);
const allYears = parse(PresetsKeySchema, Object.keys(all));
const latestYears = parse(pipe(PresetsKeySchema, length(2)), Object.keys(latest));

test('functions (non-extended)', () => {
	deepEqual(allYears.slice(-2), latestYears);

	const [y0, y1] = latestYears;

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
