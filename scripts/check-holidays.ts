import type { Date, Year } from '../index';

const bannedSubjects = ['제헌절'];
const requiredSubjects = [
	'설날 전날',
	'설날',
	'설날 다음 날',
	'부처님 오신 날',
	'추석 전날',
	'추석',
	'추석 다음 날',
];

const generateRequiredHolidays = (year: number) =>
	new Map<Date, string>([
		[`${year}-01-01`, '1월 1일'],
		[`${year}-03-01`, '3ㆍ1절'],
		[`${year}-05-05`, '어린이날'],
		[`${year}-06-06`, '현충일'],
		[`${year}-08-15`, '광복절'],
		[`${year}-10-03`, '개천절'],
		[`${year}-10-09`, '한글날'],
		[`${year}-12-25`, '기독탄신일'],
	]);

export const checkHolidays = (preset: Year, year: number) => {
	for (const [date, subject] of preset) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
			throw new Error(
				`Invalid date format. ${date} should in YYYY-MM-DD format`
			);

		if (date.substring(0, 4) !== year.toString())
			throw new Error(
				`Invalid date value. ${date} should be a date in ${year}`
			);

		if (bannedSubjects.includes(subject))
			throw new Error(`Should not include ${subject}`);
	}

	const requiredHolidays = generateRequiredHolidays(year);

	for (const [date, subject] of requiredHolidays) {
		if (!preset.has(date)) throw new Error(`Missing data for ${subject}`);
		const actualSubject = preset.get(date);
		if (actualSubject !== subject)
			throw new Error(`Subject of ${date} should be ${subject}`);
	}
};
