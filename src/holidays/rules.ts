export const solarHolidays: { month: number; day: number; name: string; since?: number }[] = [
	{ month: 1, day: 1, name: '1월 1일' },
	{ month: 3, day: 1, name: '3ㆍ1절' },
	{ month: 5, day: 1, name: '노동절', since: 2026 },
	{ month: 5, day: 5, name: '어린이날' },
	{ month: 6, day: 6, name: '현충일' },
	{ month: 7, day: 17, name: '제헌절', since: 2026 },
	{ month: 8, day: 15, name: '광복절' },
	{ month: 10, day: 3, name: '개천절' },
	{ month: 10, day: 9, name: '한글날' },
	{ month: 12, day: 25, name: '기독탄신일' },
];

export const lunarHolidays: {
	month: number;
	day: number;
	name: string;
	names?: [string, string, ...string[]];
}[] = [
	{ month: 1, day: 1, name: '설날', names: ['설날 전날', '설날', '설날 다음 날'] },
	{ month: 4, day: 8, name: '부처님 오신 날' },
	{ month: 8, day: 15, name: '추석', names: ['추석 전날', '추석', '추석 다음 날'] },
];
