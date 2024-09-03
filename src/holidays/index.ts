import { validateDateStrings } from '../modules/validate.ts';
import { checkLunarHolidays, checkSolarHolidays } from './check.ts';
import * as presets from './presets.ts';

for (const [key, preset] of Object.entries(presets)) {
	const year = Number(key.substring(1));

	validateDateStrings(year, preset);
	checkLunarHolidays(year, preset);
	checkSolarHolidays(year, preset);

	// TODO Generate json, csv, ics files.
}
