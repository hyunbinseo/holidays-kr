import type { ISODate } from '../types.ts';

const KST_OFFSET = 9 * 60 * 60_000;
const ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;

// TODO Add support for Temporal API
export type DateLike = Date | string;

export const toKSTISODate = (input: DateLike) => {
	if (typeof input === 'string') {
		const date = new Date(input);
		if (
			ISO_DATE_REGEX.test(input) &&
			!isNaN(date.valueOf()) &&
			date.toISOString().startsWith(input)
		) {
			return input as ISODate;
		}
		throw new TypeError(`Invalid date string: ${input}`);
	}
	if (input instanceof Date) {
		if (!isNaN(input.valueOf())) {
			return new Date(input.valueOf() + KST_OFFSET).toISOString().slice(0, 10) as ISODate;
		}
		throw new RangeError('Invalid Date');
	}
	throw new Error();
};
