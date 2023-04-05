import type { DateString, Year } from './index.js';
import * as holidays from './index.js';

export const isHoliday = (date: Date): boolean | null | TypeError => {
	if (!(date instanceof Date)) return new TypeError('Invalid date.');

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

	if (!(key in holidays)) return null;

	const preset = holidays[key] as Year;

	return preset.has(dateString) ? true : false;
};
