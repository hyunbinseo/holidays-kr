import * as presets from './holidays/presets.js';
import { toROKDateString } from './modules/utilities.js';

export const getHolidayNames = (date: Date) => {
	const dateString = toROKDateString(date);
	const yearString = dateString.substring(0, 4);
	const moduleName = 'y' + yearString;

	const isValidModuleName = (str: string): str is keyof typeof presets => str in presets;
	if (!isValidModuleName(moduleName)) throw new RangeError(`Year ${yearString} is not supported.`);

	const preset = presets[moduleName];

	const isValidDateString = (str: string): str is keyof typeof preset => str in preset;
	if (!isValidDateString(dateString)) return null;

	return preset[dateString];
};

export const isHoliday = (date: Date) => !!getHolidayNames(date);
