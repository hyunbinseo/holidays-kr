// 공휴일에 관한 법률 (약칭: 공휴일법)
// https://www.law.go.kr/법령/공휴일에+관한+법률

// 양력 공휴일
// 1. 「국경일에 관한 법률」에 따른 국경일 중 3ㆍ1절, 광복절, 개천절 및 한글날
// 2. 1월 1일
// 5. 어린이날 (5월 5일)
// 6. 현충일 (6월 6일)
// 8. 기독탄신일 (12월 25일)

// 음력 공휴일
// 3. 설날 전날, 설날, 설날 다음 날 (음력 12월 말일, 1월 1일, 2일)
// 4. 부처님 오신 날 (음력 4월 8일)
// 7. 추석 전날, 추석, 추석 다음 날 (음력 8월 14일, 15일, 16일)

type RequiredHolidayDates<Year extends number> =
	| `${Year}-01-01`
	| `${Year}-03-01`
	| `${Year}-05-05`
	| `${Year}-06-06`
	| `${Year}-08-15`
	| `${Year}-10-03`
	| `${Year}-10-09`
	| `${Year}-12-25`;

type ValidateSolarHolidays<Year extends number> = {
	[K in RequiredHolidayDates<Year>]: K extends `${Year}-01-01`
		? readonly ['1월 1일', ...string[]]
		: K extends `${Year}-03-01`
			? readonly ['3ㆍ1절', ...string[]]
			: K extends `${Year}-05-05`
				? readonly ['어린이날', ...string[]]
				: K extends `${Year}-06-06`
					? readonly ['현충일', ...string[]]
					: K extends `${Year}-08-15`
						? readonly ['광복절', ...string[]]
						: K extends `${Year}-10-03`
							? readonly ['개천절', ...string[]]
							: K extends `${Year}-10-09`
								? readonly ['한글날', ...string[]]
								: K extends `${Year}-12-25`
									? readonly ['기독탄신일', ...string[]]
									: never;
};

type HasValue<Union, Required> = Required extends Union
	? unknown
	: { '음력 공휴일 누락': Required };

type ValidateLunarHolidaysHelper<Values> = //
	HasValue<Values, '설날 전날'> &
		HasValue<Values, '설날'> &
		HasValue<Values, '설날 다음 날'> &
		HasValue<Values, '부처님 오신 날'> &
		HasValue<Values, '추석 전날'> &
		HasValue<Values, '추석'> &
		HasValue<Values, '추석 다음 날'>;

type ExtractAllValues<T> = T[keyof T] extends readonly (infer U)[] ? U : never;

export type ValidateHolidays<Year extends number, T extends ValidateSolarHolidays<Year>> = T &
	ValidateLunarHolidaysHelper<ExtractAllValues<T>>;
