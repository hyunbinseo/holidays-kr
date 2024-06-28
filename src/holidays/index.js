import y2022 from './2022.json';
import y2023 from './2023.json';
import y2024 from './2024.json';
import y2025 from './2025.json';

/** @import { Holidays } from "../types.js" */
/** @type {ReadonlyMap<number, [Holidays, number]>} */
const yearlyHolidays = new Map([
	[2022, [y2022, 1669509606092]],
	[2023, [y2023, 1669289424786]],
	[2024, [y2024, 1687425345417]],
	[2025, [y2025, 1719570756964]],
]);

for (const [year, [holidays, timestamp]] of yearlyHolidays) {
	// TODO Check preset and write files.
}
