# 대한민국의 공휴일

우주항공청에서 발표한 월력요항을 사용합니다. [English](#usage)

- `Date` 객체의 공휴일 여부와 그 명칭들을 확인합니다.
- `CSV`, `JSON`, `ICS`, 캘린더 구독도 제공됩니다. [링크](https://github.com/hyunbinseo/holidays-kr#readme)

```js
// 최근 2개년도의 공휴일 정보가 들어있습니다.
// 예를 들어 v3.2025 버전으로 2024-2025년의 날짜를 확인할 수 있습니다.
import { getHolidayNames, isHoliday } from '@hyunbinseo/holidays-kr';

// 공휴일 여부
isHoliday(new Date('2025-01-01T00:00:00+0900')); // true
isHoliday(new Date('2025-01-02T00:00:00+0900')); // false
isHoliday(new Date('2023-01-01T00:00:00+0900')); // RangeError

// 공휴일 명칭(들)
getHolidayNames(new Date('2025-05-05T00:00:00+0900')); // [ '어린이날', '부처님 오신 날' ]
getHolidayNames(new Date('2025-05-04T00:00:00+0900')); // null
```

<!-- Importing from jsDelivr, etc. is not recommended. -->
<!-- Use bundlers to tree-shake unused holiday presets. -->

---

## Usage

Based on the latest release. [migration guide](#migration)

```js
// ESM and CJS are both supported.
import { y2025 } from '@hyunbinseo/holidays-kr';
const { y2025 } = require('@hyunbinseo/holidays-kr');
```

Check if a date string is a holiday:

```js
import { y2024, y2025 } from '@hyunbinseo/holidays-kr';

'2025-01-01' in y2025; // true
'2025-01-02' in y2025; // false

'2024-01-01' in y2025; // false
'2024-01-01' in y2024; // true
```

```jsonc
// y2025 is shaped like this:
{
  "2025-01-01": ["1월 1일"],
  "2025-01-28": ["설날 전날"],
  // ...
  "2025-12-25": ["기독탄신일"],
}
```

Check if a JavaScript Date is a holiday:

```js
// Uses the latest 2 years of holiday data.
// e.g. v3.2025 supports dates in the year 2024-2025
// Supports tree-shaking: unused data is not bundled.
import { isHoliday } from '@hyunbinseo/holidays-kr';

// Jan 01 2025 00:00:00 GMT+0900 is a holiday in ROK.
isHoliday(new Date('2025-01-01T00:00:00+0900')); // true

// Be cautious with the date's time zone!
// Dec 31 2024 23:00:00 GMT+0900 is not a holiday in ROK.
isHoliday(new Date('2025-01-01T00:00:00+1000')); // false

// Throws RangeError in versions 3.2025 and above.
isHoliday(new Date('2023-01-01T00:00:00+0900'));
```

```js
// Trailing E stands for extended.
// Uses holiday data from the year 2022.
// e.g. v3.2025 supports dates in the year 2022-2025
import { isHolidayE } from '@hyunbinseo/holidays-kr';

isHolidayE(new Date('2023-01-01T00:00:00+0900')); // true
```

Get holiday names of a given JavaScript Date:

```js
// Trailing E stands for extended. Same as above.
import { getHolidayNames, getHolidayNamesE } from '@hyunbinseo/holidays-kr';

getHolidayNames(new Date('2025-05-05T00:00:00+0900')); // [ '어린이날', '부처님 오신 날' ]
getHolidayNames(new Date('2025-05-04T00:00:00+0900')); // null
```

## Migration

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
