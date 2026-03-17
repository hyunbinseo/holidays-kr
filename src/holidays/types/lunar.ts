// 음력 공휴일
// See https://www.law.go.kr/법령/공휴일에+관한+법률
// 3. 설날 전날, 설날, 설날 다음 날 (음력 12월 말일, 1월 1일, 2일)
// 4. 부처님 오신 날 (음력 4월 8일)
// 7. 추석 전날, 추석, 추석 다음 날 (음력 8월 14일, 15일, 16일)

type HasValue<Union, Required> = Required extends Union
	? unknown
	: { '음력 공휴일 누락': Required };

export type ValidateLunarHolidaysHelper<Values> = //
	HasValue<Values, '설날 전날'> &
		HasValue<Values, '설날'> &
		HasValue<Values, '설날 다음 날'> &
		HasValue<Values, '부처님 오신 날'> &
		HasValue<Values, '추석 전날'> &
		HasValue<Values, '추석'> &
		HasValue<Values, '추석 다음 날'>;
