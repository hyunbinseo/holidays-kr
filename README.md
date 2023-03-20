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

const y2023 = yearlyHolidays['y2023'];
```

## Static Files

Reference the [public](/public) directory.

- Yearly `CSV`, `ICS`, `JSON` files.
- Cumulated `ICS`, `JSON` files.
