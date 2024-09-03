import { doesNotThrow } from 'node:assert/strict';
import { test } from 'node:test';
import * as presets from '../src/holidays/all.ts';
import { checkLunarHolidays, checkSolarHolidays } from './holidays.ts';
import { validatePreset } from './validate.ts';

test('holidays', () => {
	for (const [key, preset] of Object.entries(presets)) {
		const year = Number(key.substring(1));
		doesNotThrow(() => {
			validatePreset(year, preset);
			checkLunarHolidays(year, preset);
			checkSolarHolidays(year, preset);
		});
	}
});
