# 대한민국의 공휴일

우주항공청에서 발표한 월력요항을 사용합니다. [English](#usage)

- `Date` 객체의 공휴일 여부와 그 명칭들을 확인합니다.
- `CSV`, `JSON`, `ICS`, 캘린더 구독도 제공됩니다. [링크](https://github.com/hyunbinseo/holidays-kr#readme)

```js
// 요청한 연도의 공휴일 정보를 동적으로 불러옵니다.
import { getHolidayNames, isHoliday } from '@hyunbinseo/holidays-kr';

// 공휴일 여부
await isHoliday(new Date('2026-01-01T00:00:00+0900')); // true
await isHoliday(new Date('2026-01-02T00:00:00+0900')); // false
await isHoliday(new Date('2999-01-01T00:00:00+0900')); // RangeError

// 공휴일 명칭(들)
await getHolidayNames(new Date('2026-05-05T00:00:00+0900')); // ['어린이날']
await getHolidayNames(new Date('2026-05-04T00:00:00+0900')); // null
```

```js
// 연도별 공휴일 정보를 정적으로 불러옵니다.
import { y2026 } from '@hyunbinseo/holidays-kr';
```

```jsonc
// y2026의 형태:
{
  "2026-01-01": ["1월 1일"],
  // ...
  "2026-12-25": ["기독탄신일"],
}
```

---

## Usage

Check if a `yyyy-mm-dd` date string is a holiday:

```js
import { y2026 } from '@hyunbinseo/holidays-kr';

'2026-01-01' in y2026; // true
'2026-01-02' in y2026; // false
'2025-01-01' in y2026; // false - different year
```

```jsonc
// y2026 is shaped like this:
{
  "2026-01-01": ["1월 1일"],
  // ...
  "2026-12-25": ["기독탄신일"],
}
```

Check if a JavaScript Date is a holiday:

```js
// Dynamically imports the preset for the requested year.
import { isHoliday } from '@hyunbinseo/holidays-kr';

// Jan 01 2026 00:00:00 GMT+0900 is a holiday in ROK.
await isHoliday(new Date('2026-01-01T00:00:00+0900')); // true

// Be cautious with the date's time zone!
// Dec 31 2025 23:00:00 GMT+0900 is not a holiday in ROK.
await isHoliday(new Date('2026-01-01T00:00:00+1000')); // false

// Throws RangeError if no preset exists for the year.
await isHoliday(new Date('2999-01-01T00:00:00+0900'));
```

Get holiday names of a given JavaScript Date:

```js
import { getHolidayNames } from '@hyunbinseo/holidays-kr';

await getHolidayNames(new Date('2026-05-05T00:00:00+0900')); // ['어린이날']
await getHolidayNames(new Date('2026-05-04T00:00:00+0900')); // null
```

## Migration

### 4.x

- `isHoliday` and `getHolidayNames` are now async
- `isHolidayE` and `getHolidayNamesE` are removed
- Holiday presets are dynamically imported per year

```diff
- isHoliday(date);
- isHolidayE(date);
+ await isHoliday(date);
```

```diff
- getHolidayNames(date);
- getHolidayNamesE(date);
+ await getHolidayNames(date);
```

### 3.x

- `/public` directory is no longer included.
- `TypeError` is thrown instead of being returned.
- `RangeError` is thrown instead of returning `null`.
- `isHoliday` uses the latest 2 years of holiday data.
- `isHoliday` no longer supports the `options` parameter.

```diff
# Yearly holidays changed from a Map to an Object.
- y2025.has('2025-01-01');
+ '2025-01-01' in y2025;
```

```js
// Check the day value of a `Date` object.
import { dateToDayWithOffset } from '@hyunbinseo/tools';
const date = new Date('2023-01-07T00:00:00+0900');
dateToDayWithOffset(date, '+09:00'); // 6 - Saturday
```

### 2.x

```diff
- import { isHoliday } from '@hyunbinseo/holidays-kr/check';
+ import { isHoliday } from '@hyunbinseo/holidays-kr';
```
