import type { ISODate, Preset } from '../types.ts';

const KST_OFFSET = 9 * 60 * 60_000;

const modules = import.meta.glob<Preset>('./2*.ts', { import: 'default' });

export const getHolidayNames = async (date: Date) => {
	if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);

	const yyyy_mm_dd = new Date(date.valueOf() + KST_OFFSET).toISOString().slice(0, 10) as ISODate;
	const yyyy = yyyy_mm_dd.slice(0, 4);

	const loader = modules[`./${yyyy}.ts`];
	if (!loader) throw new RangeError(`No preset for year ${yyyy}.`);

	const preset = await loader();
	return preset[yyyy_mm_dd] ?? null;
};

export const isHoliday = async (date: Date) => !!(await getHolidayNames(date));
