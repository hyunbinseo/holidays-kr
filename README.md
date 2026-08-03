# 대한민국의 공휴일

우주항공청에서 발표한 월력요항을 사용합니다.

- `Date` 객체 또는 `YYYY-MM-DD` 날짜 문자열의 공휴일 여부와 그 명칭들을 확인합니다
- `CSV`, `JSON`, `ICS` 파일(호스팅) 및 구독할 수 있는 캘린더 URL도 제공됩니다. [링크](https://github.com/hyunbinseo/holidays-kr#readme)

## 설치법

패키지 매니저로 설치합니다.

```sh
pnpm i @hyunbinseo/holidays-kr
```

또는 CDN에서 불러와 사용합니다.

```html
<script type="module">
	import { isHoliday } from 'https://esm.sh/@hyunbinseo/holidays-kr@5';

	await isHoliday('2026-01-01'); // true
</script>
```

CDN에서 불러올 경우 메이저 버전을 명시해야 합니다.

```plaintext
https://cdn.jsdelivr.net/npm/@hyunbinseo/holidays-kr@5/+esm
https://esm.sh/@hyunbinseo/holidays-kr@5
https://unpkg.com/@hyunbinseo/holidays-kr@5?module
```

## 사용법

API는 연도별 공휴일 정보를 동적으로 불러오며, 데이터가 존재하지 않으면 `RangeError`를 던집니다.

```js
import { getHolidayNames, isHoliday } from '@hyunbinseo/holidays-kr';

// 공휴일 여부
await isHoliday(new Date('2026-01-02T00:00:00+0900')); // false
await isHoliday(new Date('2026-01-01T00:00:00+0900')); // true
await isHoliday('2026-01-01'); // true

// 공휴일 명칭(들)
await getHolidayNames(new Date('2026-05-04T00:00:00+0900')); // null
await getHolidayNames(new Date('2026-05-05T00:00:00+0900')); // ['어린이날']
await getHolidayNames('2026-05-05'); // ['어린이날']
```

```js
import { getHolidayPreset } from '@hyunbinseo/holidays-kr';

const y2026 = await getHolidayPreset('2026');
'2026-01-01' in y2026; // true
'2026-01-02' in y2026; // false
```

```jsonc
// y2026의 형태:
{
	"2026-01-01": ["1월 1일"],
	// ...
	"2026-12-25": ["기독탄신일"],
}
```

## 마이그레이션

### 5.x

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

### 4.x

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

### 3.x

- `/public` 디렉토리가 더 이상 포함되지 않습니다
- 값을 반환하는 대신 `TypeError`를 던집니다
- `null`을 반환하는 대신 `RangeError`를 던집니다
- `isHoliday`는 최근 2개년의 공휴일 데이터를 사용합니다
- `isHoliday`는 더 이상 `options` 매개변수를 지원하지 않습니다

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

### 2.x

```diff
- import { isHoliday } from '@hyunbinseo/holidays-kr/check';
+ import { isHoliday } from '@hyunbinseo/holidays-kr';
```
