// TODO Replace `assert` to `with` in JSON imports.
// esbenp.prettier-vscode@10.4.0 does not support it.
// Reference https://github.com/nodejs/node/pull/50141

import y2022 from './2022.json' assert { type: 'json' };
import y2023 from './2023.json' assert { type: 'json' };
import y2024 from './2024.json' assert { type: 'json' };
import y2025 from './2025.json' assert { type: 'json' };

import { validateDateStrings } from '../modules/validate.js';
import { checkLunarHolidays, checkSolarHolidays } from './check.js';

/** @import { Preset } from "$types" */
/** @type {ReadonlyMap<number, [Preset, number]>} */
const yearlyHolidays = new Map([
	[2022, [y2022, 1669509606092]],
	[2023, [y2023, 1669289424786]],
	[2024, [y2024, 1687425345417]],
	[2025, [y2025, 1719570756964]],
]);

for (const [year, [holidays, timestamp]] of yearlyHolidays) {
	validateDateStrings(year, holidays);
	checkLunarHolidays(year, holidays);
	checkSolarHolidays(year, holidays);
	// TODO Check preset and write files.
}
