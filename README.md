# South Korea's National Holidays

Yearly updated based on the official gazette. Available in [npm] and [jsDelivr].

[npm]: https://www.npmjs.com/package/@hyunbinseo/holidays-kr
[jsDelivr]: https://www.jsdelivr.com/package/npm/@hyunbinseo/holidays-kr

## Usage

```js
// ESM and CJS are both supported.
import { y2025 } from '@hyunbinseo/holidays-kr';
const { y2025 } = require('@hyunbinseo/holidays-kr');
```

```js
import {
  holidays, // All holidays from the year 2022
  y2025, // Holidays of the year 2025
} from '@hyunbinseo/holidays-kr';

'2025-01-01' in y2025; // true
'2025-01-02' in y2025; // false
```

```jsonc
// y2025 is shaped like this:
{
  "2025-01-01": ["1월 1일"],
  "2025-01-28": ["설날 전날"]
  // ...
}
```

Check if a JavaScript Date is a holiday. Be cautious with the date's timezone.

```js
import { isHoliday } from '@hyunbinseo/holidays-kr';

// +0900 is equivalent to the Asia/Seoul timezone.
isHoliday(new Date('2025-01-01T00:00:00.000+0900')); // true

const date = new Date('2025-01-04T00:00:00.000+0900'); // Saturday
isHoliday(date, { include: { saturday: true } }); // true
isHoliday(date, { include: { sunday: true } }); // false
isHoliday(date); // false

isHoliday(new Date('2025-01-01T00:00:00.000+1000')); // false
// Sat Dec 31 2024 23:00:00 GMT+0900 is not a holiday.
```

## Migration

### 3.x

The `/public` directory is no longer included.

```js
// Throws error instead of returning null or TypeError.
isHoliday(new Date(2021, 0)); // Date before the year 2022
isHoliday('2025-01-01'); // Is not Date
```

```diff
# Yearly holidays changed from a Map to an Object.
- y2025.has('2025-01-01');
+ '2025-01-01' in y2025;
```

### 2.x

```diff
- import { isHoliday } from '@hyunbinseo/holidays-kr/check';
+ import { isHoliday } from '@hyunbinseo/holidays-kr';
```
