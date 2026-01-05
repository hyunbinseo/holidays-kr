import * as latest from './holidays.latest.ts';
import * as all from './holidays.ts';
import type { Presets } from './types.ts';

const KST_OFFSET = 9 * 60 * 60_000;

const createFn = (presets: Presets) => (date: Date) => {
	if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);

	const yyyy_mm_dd = new Date(date.valueOf() + KST_OFFSET)
		.toISOString()
		.substring(0, 10) as `${number}-${number}-${number}`;

	const yyyy = yyyy_mm_dd.substring(0, 4);

	const preset = presets[`y${yyyy}` as `y${number}`];
	if (!preset) throw new RangeError(`Missing holiday preset for year ${yyyy}.`);

	return preset[yyyy_mm_dd] ?? null;
};

export * from './holidays.ts';
export const getHolidayNames = createFn(latest);
export const getHolidayNamesE = createFn(all);
export const isHoliday = (date: Date) => !!getHolidayNames(date);
export const isHolidayE = (date: Date) => !!getHolidayNamesE(date);

{
	const yyyy = new Date(Date.now() + KST_OFFSET).getUTCFullYear();
	if (!(`y${yyyy}` in latest))
		console.warn(`Missing holiday preset for year ${yyyy}. Please update the package.`);
}
