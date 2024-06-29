// 공휴일에 관한 법률 (약칭: 공휴일법)
// [시행 2022. 1. 1.] [법률 제18291호, 2021. 7. 7., 제정]
// https://www.law.go.kr/법령/공휴일에+관한+법률

// 음력 공휴일
// 3. 설날 전날, 설날, 설날 다음 날 (음력 12월 말일, 1월 1일, 2일)
// 4. 부처님 오신 날 (음력 4월 8일)
// 7. 추석 전날, 추석, 추석 다음 날 (음력 8월 14일, 15일, 16일)

/** @type {ReadonlySet<string>} */
const lunarHolidaySubjects = new Set([
	'설날 전날',
	'설날',
	'설날 다음 날',
	'부처님 오신 날',
	'추석 전날',
	'추석',
	'추석 다음 날',
]);

/** @type {import("$types").CheckPreset} */
export const checkLunarHolidays = (year, holidays) => {
	/** @type {ReadonlySet<string>} */
	const subjects = new Set(Object.values(holidays).flatMap((subjects) => subjects));

	for (const requiredSubject of lunarHolidaySubjects) {
		if (!subjects.has(requiredSubject)) {
			throw new Error(`${year}년도 '${requiredSubject}' 누락`);
		}
	}
};

// 양력 공휴일
// 1. 「국경일에 관한 법률」에 따른 국경일 중 3ㆍ1절, 광복절, 개천절 및 한글날
// 2. 1월 1일
// 5. 어린이날 (5월 5일)
// 6. 현충일 (6월 6일)
// 8. 기독탄신일 (12월 25일)

/**
 * @param {number} year
 * @returns {ReadonlyMap<string, string>}
 */
const generateSolarHolidays = (year) =>
	new Map([
		[`${year}-03-01`, '3ㆍ1절'],
		[`${year}-08-15`, '광복절'],
		[`${year}-10-03`, '개천절'],
		[`${year}-10-09`, '한글날'],
		[`${year}-01-01`, '1월 1일'],
		[`${year}-05-05`, '어린이날'],
		[`${year}-06-06`, '현충일'],
		[`${year}-12-25`, '기독탄신일'],
	]);

/** @type {import("$types").CheckPreset} */
export const checkSolarHolidays = (year, holidays) => {
	for (const [dateString, requiredSubject] of generateSolarHolidays(year)) {
		if ((holidays[dateString] || []).includes(requiredSubject)) continue;
		throw new Error(`${year}년도 '${requiredSubject}' 오류`);
	}
};
