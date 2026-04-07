// 양력 공휴일
// See https://www.law.go.kr/법령/공휴일에+관한+법률
// 1. 「국경일에 관한 법률」에 따른 국경일 중 3ㆍ1절, 광복절, 개천절 및 한글날
// 2. 1월 1일
// 5. 어린이날 (5월 5일)
// 6. 현충일 (6월 6일)
// 8. 기독탄신일 (12월 25일)

// TODO Apply different holidays per year
// NOTE 노동절, 제헌절 are holidays as of 2026

type SolarHolidayMap = {
	'01-01': '1월 1일';
	'03-01': '3ㆍ1절';
	'05-05': '어린이날';
	'06-06': '현충일';
	'08-15': '광복절';
	'10-03': '개천절';
	'10-09': '한글날';
	'12-25': '기독탄신일';
};

export type ValidateSolarHolidays<Year extends number> = {
	[K in keyof SolarHolidayMap as `${Year}-${K}`]: readonly [SolarHolidayMap[K], ...string[]];
};
