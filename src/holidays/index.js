import { validateDateStrings } from '../modules/validate.js';
import { checkLunarHolidays, checkSolarHolidays } from './modules/check.js';
import * as presets from './presets.js';

for (const [key, _preset] of Object.entries(presets)) {
	const year = Number(key.substring(1));

	/** @type {import('$types').Preset} */
	const preset = _preset;

	validateDateStrings(year, preset);
	checkLunarHolidays(year, preset);
	checkSolarHolidays(year, preset);

	// TODO Generate json, csv, ics files.
}
