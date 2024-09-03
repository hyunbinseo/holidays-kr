import * as latest from './holidays/latest.js';
import * as presets from './holidays/presets.ts';
import type { Preset } from './types.ts';

const presetsToFunction = (presets: Partial<Record<string, Preset>>) => (date: Date) => {
	if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);
	const dateString = new Date(date.valueOf() + 9 * 60 * 60 * 1000).toISOString().substring(0, 10);
	const moduleName = 'y' + dateString.substring(0, 4);
	const preset = presets[moduleName];
	if (!preset) throw new RangeError(`${dateString} cannot be determined.`);
	return preset[dateString] || null;
};

export * from './holidays/presets.ts';

export const getHolidayNames = presetsToFunction(latest);
export const isHoliday = (date: Date) => !!getHolidayNames(date);

export const getHolidayNamesE = presetsToFunction(presets);
export const isHolidayE = (date: Date) => !!getHolidayNamesE(date);
