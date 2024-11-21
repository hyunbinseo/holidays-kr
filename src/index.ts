import * as all from './holidays/all.ts';
import * as latest from './holidays/latest.js';
import type { Presets } from './types.ts';

const createFn = (presets: Presets) => (date: Date) => {
	if (!(date instanceof Date)) throw new TypeError(`${date} is not a Date`);
	const dateString = new Date(date.valueOf() + 9 * 60 * 60 * 1000).toISOString().substring(0, 10);
	const moduleName = 'y' + dateString.substring(0, 4);
	const preset = presets[moduleName];
	if (!preset) throw new RangeError(`${dateString} cannot be determined.`);
	return preset[dateString] || null;
};

export * from './holidays/all.ts';
export const getHolidayNames = createFn(latest);
export const getHolidayNamesE = createFn(all);
export const isHoliday = (date: Date) => !!getHolidayNames(date);
export const isHolidayE = (date: Date) => !!getHolidayNamesE(date);

{
	const year = new Date().getUTCFullYear();
	if (!(`y${year}` in latest))
		console.warn(`${year}년도 공휴일 정보가 없습니다. 패키지를 업데이트해 주세요.`);
}
