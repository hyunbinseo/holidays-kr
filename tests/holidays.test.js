import { doesNotThrow, equal } from 'node:assert/strict';
import test from 'node:test';
import { parse } from 'valibot';
import * as presets from '../src/holidays/all.ts';
import { createSolarHolidays, lunarHolidaySubjects } from './holidays.ts';
import {
	createPresetKeysSchema,
	PresetsKeyToYearSchema,
	PresetValuesToSubjectsSchema,
} from './schemas.ts';

for (const entry of Object.entries(presets)) {
	/** @type {import('../src/types.ts').Preset} */
	const preset = entry[1];
	const year = parse(PresetsKeyToYearSchema, entry[0]);

	test(`holidays (${year})`, () => {
		doesNotThrow(() => parse(createPresetKeysSchema(year), Object.keys(preset)));

		const subjects = parse(PresetValuesToSubjectsSchema, Object.values(preset));
		equal(lunarHolidaySubjects.isSubsetOf(subjects), true);

		for (const [dateString, subject] of createSolarHolidays(year)) {
			equal(preset[dateString]?.includes(subject), true);
		}
	});
}
