# @hyunbinseo/holidays-kr

South Korea's national holidays, based on the official gazette. Yearly updated.

## Available in

- [npm](https://www.npmjs.com/package/@hyunbinseo/holidays-kr)
- [jsDelivr](https://www.jsdelivr.com/package/npm/@hyunbinseo/holidays-kr)

## Static Files

Reference the [public](/public) directory.

- Yearly `CSV`, `ICS`, `JSON` files.
- Cumulated `ICS`, `JSON` files.

## Modules

Reference the [index.js](/index.js) file.

```
npm i @hyunbinseo/holidays-kr
```

```javascript
// Map<`${number}-${number}-${number}`, string>
import { y2023 } from '@hyunbinseo/holidays-kr';

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
