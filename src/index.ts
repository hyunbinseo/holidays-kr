import _y2022 from './holidays/2022.json';
import _y2023 from './holidays/2023.json';
import _y2024 from './holidays/2024.json';
import _y2025 from './holidays/2025.json';
import type { Holidays } from './types.js';

export const y2022: Holidays = _y2022;
export const y2023: Holidays = _y2023;
export const y2024: Holidays = _y2024;
export const y2025: Holidays = _y2025;

const holidays: Holidays = {
	...y2022,
	...y2023,
	...y2024,
	...y2025,
};

// TODO Implement functions.
export const isHoliday = () => {};
export const isHolidayOf = () => {};
