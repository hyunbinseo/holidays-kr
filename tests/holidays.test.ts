import assert, { doesNotThrow, equal } from 'node:assert/strict';
import test from 'node:test';
import { parse } from 'valibot';
import * as presets from '../src/holidays/all.ts';
import type { Preset } from '../src/types.ts';
import { createSolarHolidays, lunarHolidaySubjects } from './holidays.ts';
import {
	createPresetKeysSchema,
	PresetsKeyToYearSchema,
	PresetValuesToSubjectsSchema,
} from './schemas.ts';

for (const [key, preset] of Object.entries<Preset>(presets)) {
	const year = parse(PresetsKeyToYearSchema, key);

	test(key, () => {
		equal(`${year}-01-01` in preset, true);
		equal(`${year}-01-02` in preset, false);
		equal(`${year - 1}-01-01` in preset, false);

		doesNotThrow(() => parse(createPresetKeysSchema(year), Object.keys(preset)));

		const subjects = parse(PresetValuesToSubjectsSchema, Object.values(preset));
		assert(Array.from(lunarHolidaySubjects).every((item) => subjects.has(item)));

		for (const [dateString, subject] of createSolarHolidays(year)) {
			assert(preset[dateString]?.includes(subject));
		}
	});
}
