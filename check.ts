import type { DateString, Year } from './index.js';
import * as holidays from './index.js';

const isValidKey = (key: string): key is keyof typeof holidays =>
	key in holidays;

type Options = {
	include: Partial<{
		saturday: boolean;
		sunday: boolean;
	}>;
};

export const isHoliday = (
	date: Date,
	options?: Options
): boolean | null | TypeError => {
	if (!(date instanceof Date)) return new TypeError('Invalid date.');

	if (options?.include?.sunday && date.getDay() === 0) return true;
	if (options?.include?.saturday && date.getDay() === 6) return true;

	const dateString = date
		.toLocaleDateString('ko-KR', {
			timeZone: 'Asia/Seoul',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.replace(/\. /g, '-')
		.replace(/.$/, '') as DateString;

	const key = `y${dateString.substring(0, 4)}`;

	if (!isValidKey(key)) return null;

	const preset = holidays[key] as Year;

	return preset.has(dateString) ? true : false;
};
