import type { Preset } from '../types.ts';
import { toISODate, type DateLike } from './utils.ts';

const holidayPresets = import.meta.glob<Preset>('./2*.ts', { import: 'default' });

export const getHolidayPreset = async (yyyy: string) => {
	const loader = holidayPresets[`./${yyyy}.ts`];
	if (!loader) throw new RangeError(`No preset for year ${yyyy}`);
	return loader();
};

export const getHolidayNames = async (input: DateLike) => {
	const yyyy_mm_dd = toISODate(input);
	const yyyy = yyyy_mm_dd.slice(0, 4);

	const preset = await getHolidayPreset(yyyy);
	return preset[yyyy_mm_dd] ?? null;
};

export const isHoliday = async (input: DateLike) => !!(await getHolidayNames(input));
