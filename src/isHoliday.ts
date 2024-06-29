import type { Preset } from '$types';
import * as presets from './holidays/presets.js';
import { toROKDateString } from './modules/utilities.js';

type ValidKey = keyof typeof presets;
const isValidKey = (key: string): key is ValidKey => key in presets;

export const isHoliday = (date: Date) => {
	const dateString = toROKDateString(date);
	const yearString = dateString.substring(0, 4);

	const key = 'y' + yearString;
	if (!isValidKey(key)) throw new RangeError(`Year ${yearString} is not supported.`);

	return dateString in presets[key];
};

export const isHolidayOf = (date: Date, preset: Preset) => toROKDateString(date) in preset;
