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

/** @param {number} year */
const generateRequiredHolidays = (year) => ({
	[`${year}-01-01`]: '1월 1일',
	[`${year}-03-01`]: '3ㆍ1절',
	[`${year}-05-05`]: '어린이날',
	[`${year}-06-06`]: '현충일',
	[`${year}-08-15`]: '광복절',
	[`${year}-10-03`]: '개천절',
	[`${year}-10-09`]: '한글날',
	[`${year}-12-25`]: '기독탄신일',
});

/**
 * @param {Object} param
 * @param {any} param.preset
 * @param {number} param.year
 * @returns {preset is Object.<string, string>}
 */
export const checkHolidays = ({ preset, year }) => {
	if (!preset || typeof preset !== 'object' || !Object.keys(preset).length) throw new Error('Invalid preset format');

	for (const date of Object.keys(preset)) {
		const subject = preset[date];
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date format. ${date} should in YYYY-MM-DD format`);
		if (date.substring(0, 4) !== year.toString()) throw new Error(`Invalid date value. ${date} should be a date in year ${year}`);
		if (!subject || typeof subject !== 'string') throw new Error(`Invalid subject format. Subject of ${date} should be a truthy string`);
	};

	const subjects = Object.values(preset);

	for (const bannedSubject of bannedSubjects) {
		if (subjects.includes(bannedSubject)) throw new Error(`Should not include ${bannedSubject}`);
	};

	for (const requiredSubject of requiredSubjects) {
		if (!subjects.includes(requiredSubject)) throw new Error(`Missing required ${requiredSubject}`);
	};

	const requiredHolidays = generateRequiredHolidays(year);

	for (const date of Object.keys(requiredHolidays)) {
		const actualSubject = preset[date];
		const expectedSubject = requiredHolidays[date];
		if (actualSubject !== expectedSubject) throw new Error(`Invalid date-subject pair. ${date} should be ${expectedSubject}`);
	}

	return true;
};
