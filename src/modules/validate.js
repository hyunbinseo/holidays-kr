import { array, everyItem, isoDate, parse, pipe, startsWith, string, transform } from 'valibot';

/** @type {import('$types').CheckPreset} */
export const validateDateStrings = (year, holidays) => {
	const Schema = pipe(
		array(
			pipe(
				string(),
				isoDate('yyyy-MM-dd 형식이 아님'),
				startsWith(year.toString(), `${year}년도 날짜가 아님`),
				transform((v) => new Date(v)),
				// new Date() does not throw error
				// new Date('2024-06-31'); // Mon Jul 01 2024
			),
		),
		everyItem(
			(date, index, array) => !index || date > array[index - 1],
			`${year}년도 날짜 오름차순 아님`,
		),
	);
	parse(Schema, Object.keys(holidays));
};
