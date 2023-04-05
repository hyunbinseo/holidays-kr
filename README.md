# South Korea's National Holidays

Based on the official gazette. Yearly updated.

- [npm](https://www.npmjs.com/package/@hyunbinseo/holidays-kr)
- [jsDelivr](https://www.jsdelivr.com/package/npm/@hyunbinseo/holidays-kr)

## Usage

Yearly holidays are provided as a JavaScript Map. Reference the [index.js](/index.js) file.

```javascript
import { y2023 } from '@hyunbinseo/holidays-kr'; // Can be replaced with a jsDelivr URL

y2023.has('2023-01-01'); // true
y2023.has('2023-01-02'); // false

for (const [date, subject] of y2023) {
  console.log(date, subject);
  // 2023-01-01 1월 1일
  // 2023-01-21 설날 전날
  // …
}

[...y2023.keys()]; // ['2023-01-01', '2023-01-21', … ]
[...y2023.values()]; // ['1월 1일', '설날 전날', … ]
```

```javascript
import * as yearlyHolidays from '@hyunbinseo/holidays-kr';

const { y2022 } = yearlyHolidays;
const y2023 = yearlyHolidays['y2023'];
```

Check if a JavaScript Date is a holiday. Be careful with the date's timezone.

```javascript
import { isHoliday } from '@hyunbinseo/holidays-kr/check';

// GMT+0900 is equivalent to the Asia/Seoul timezone.
isHoliday(new Date('2023-01-01 GMT+0900')); // true
isHoliday(new Date('2023-01-02 GMT+0900')); // false

isHoliday(new Date('2023-01-01 GMT+1000')); // false
// Sat Dec 31 2022 23:00:00 GMT+0900 is not a holiday.

isHoliday(new Date('2000-01-01 GMT+0900')); // null
// Holiday information of the year 2000 is not included.
// Therefore, cannot determine if the date is a holiday.

isHoliday('2023-01-01'); // TypeError
```

## Static Files

Reference the [public](/public) directory.

- Yearly `CSV`, `ICS`, `JSON` files.
- Cumulated `ICS`, `JSON` files.
