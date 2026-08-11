# 업그레이드 안내

[← README](./README.md)

## v5

연도별 데이터를 불러올 때는 `getHolidayPreset` 사용을 권장합니다.

```js
import { getHolidayPreset } from '@hyunbinseo/holidays-kr';
const y2026 = await getHolidayPreset('2026');
```

연도별 데이터를 정적으로 불러올 경우 경로를 `/all`로 변경해야 합니다.

```diff
- import { y2026 } from '@hyunbinseo/holidays-kr';
+ import { y2026 } from '@hyunbinseo/holidays-kr/all';
```

## v4

ESM 전용 패키지가 되었습니다. 비동기 API로 변경되었습니다.

```diff
- isHoliday(date);
- isHolidayE(date);
+ await isHoliday(date); // 모든 연도 조회 가능
```

```diff
- getHolidayNames(date);
- getHolidayNamesE(date);
+ await getHolidayNames(date); // 모든 연도 조회 가능
```

## v3

- `/public` 디렉토리가 더 이상 포함되지 않습니다.
- 값을 반환하는 대신 `TypeError`를 던집니다.
- `null`을 반환하는 대신 `RangeError`를 던집니다.
- `isHoliday`는 최근 2개년의 공휴일 데이터를 사용합니다.
- `isHoliday`는 더 이상 `options` 매개변수를 지원하지 않습니다.

```diff
# 연도별 공휴일 데이터가 Map에서 Object로 변경됨
- y2025.has('2025-01-01');
+ '2025-01-01' in y2025;
```

```js
// `Date` 객체의 요일 값 확인하기
import { dateToDayWithOffset } from '@hyunbinseo/tools';
const date = new Date('2023-01-07T00:00:00+0900');
dateToDayWithOffset(date, '+09:00'); // 6 - Saturday
```

## v2

```diff
- import { isHoliday } from '@hyunbinseo/holidays-kr/check';
+ import { isHoliday } from '@hyunbinseo/holidays-kr';
```
