import type { DateString, Year } from 'source';

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
	new Map<DateString, string>([
		[`${year}-01-01`, '1월 1일'],
		[`${year}-03-01`, '3ㆍ1절'],
		[`${year}-05-05`, '어린이날'],
		[`${year}-06-06`, '현충일'],
		[`${year}-08-15`, '광복절'],
		[`${year}-10-03`, '개천절'],
		[`${year}-10-09`, '한글날'],
		[`${year}-12-25`, '기독탄신일'],
	]);

export const checkPreset = (preset: Year, year: number) => {
	for (const [date, subject] of preset) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
			throw new Error(
				`Invalid date format. ${date} should be in YYYY-MM-DD format.`
			);

		if (date.substring(0, 4) !== year.toString())
			throw new Error(
				`Invalid date value. ${date} should be a date in ${year}.`
			);

		if (bannedSubjects.includes(subject))
			throw new Error(
				`Invalid subject. ${year} should not include ${subject}.`
			);
	}

	const subjects = [...preset.values()];

	for (const requiredSubject of requiredSubjects) {
		if (!subjects.includes(requiredSubject))
			throw new Error(`Invalid preset. ${year} is missing ${requiredSubject}.`);
	}

	const requiredHolidays = generateRequiredHolidays(year);

	for (const [date, subject] of requiredHolidays) {
		if (!preset.has(date))
			throw new Error(`Invalid preset. ${year} is missing ${subject}.`);
		if (preset.get(date) !== subject)
			throw new Error(`Invalid subject. ${date} should be ${subject}.`);
	}
};
