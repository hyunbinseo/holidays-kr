import { validateDateStrings } from '../modules/validate.ts';
import type { Preset } from '../types.ts';
import { checkLunarHolidays, checkSolarHolidays } from './modules/check.ts';
import * as presets from './presets.js';

for (const [key, _preset] of Object.entries(presets)) {
	const year = Number(key.substring(1));
	const preset: Preset = _preset;

	validateDateStrings(year, preset);
	checkLunarHolidays(year, preset);
	checkSolarHolidays(year, preset);

	// TODO Generate json, csv, ics files.
}
