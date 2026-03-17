import type { ValidateLunarHolidaysHelper } from './lunar.ts';
import type { ValidateSolarHolidays } from './solar.ts';

type ExtractAllValues<T> = T[keyof T] extends readonly (infer U)[] ? U : never;

export type ValidateHolidays<Year extends number, T extends ValidateSolarHolidays<Year>> = T &
	ValidateLunarHolidaysHelper<ExtractAllValues<T>>;
