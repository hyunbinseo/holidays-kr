import { Preset } from '$types';
import * as latest from './holidays/latest.js';
import * as presets from './holidays/presets.js';
import { toROKDateString } from './modules/utilities.js';

type Presets = Record<string, Preset | undefined>;

export const generateFn = (presets: Presets) => (date: Date) => {
	if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);
	const dateString = toROKDateString(date);
	const moduleName = 'y' + dateString.substring(0, 4);
	const preset = presets[moduleName];
	if (!preset) throw new RangeError(`${dateString} cannot be determined.`);
	return preset[dateString] || null;
};

export const getHolidayNames = generateFn(latest);
export const isHoliday = (date: Date) => !!getHolidayNames(date);

export const getHolidayNamesE = generateFn(presets);
export const isHolidayE = (date: Date) => !!getHolidayNamesE(date);