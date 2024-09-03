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

for (const [key, _preset] of Object.entries(presets)) {
	/** @type {import('../src/types.ts').Preset} */
	const preset = _preset;
	const year = parse(PresetsKeyToYearSchema, key);

	test(key, () => {
		equal(`${year}-01-01` in preset, true);
		equal(`${year}-01-02` in preset, false);
		equal(`${year - 1}-01-01` in preset, false);

		doesNotThrow(() => parse(createPresetKeysSchema(year), Object.keys(preset)));

		const subjects = parse(PresetValuesToSubjectsSchema, Object.values(preset));
		equal(lunarHolidaySubjects.isSubsetOf(subjects), true);

		for (const [dateString, subject] of createSolarHolidays(year)) {
			equal(preset[dateString]?.includes(subject), true);
		}
	});
}
