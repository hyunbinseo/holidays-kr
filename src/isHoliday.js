import * as latest from './holidays/latest.js';
import * as presets from './holidays/presets.js';
import { toROKDateString } from './modules/utilities.js';

/** @param {import('$types').Presets} presets */
export const generateFn = (presets) => {
	/** @param {Date} date */
	return (date) => {
		if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);
		const dateString = toROKDateString(date);
		const moduleName = 'y' + dateString.substring(0, 4);
		const preset = presets[moduleName];
		if (!preset) throw new RangeError(`${dateString} cannot be determined.`);
		return preset[dateString] || null;
	};
};

/** @param {Date} date  */
export const isHoliday = (date) => !!getHolidayNames(date);
export const getHolidayNames = generateFn(latest);

/** @param {Date} date  */
export const isHolidayE = (date) => !!getHolidayNamesE(date);
export const getHolidayNamesE = generateFn(presets);
