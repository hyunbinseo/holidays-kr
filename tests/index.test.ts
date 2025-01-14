import { deepEqual, doesNotThrow, equal, throws } from 'node:assert/strict';
import { test } from 'node:test';
import { parse } from 'valibot';
import * as all from '../src/holidays/all.ts';
import * as latest from '../src/holidays/latest.ts';
import { getHolidayNames, isHoliday } from '../src/index.ts';
import { PresetsKeysToYearsSchema } from './schemas.ts';

test('functions', () => {
	const allYears = parse(PresetsKeysToYearsSchema, Object.keys(all));
	const latestYears = parse(PresetsKeysToYearsSchema, Object.keys(latest));

	deepEqual(allYears.slice(-2), latestYears);
	equal(latestYears.length, 2);

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
