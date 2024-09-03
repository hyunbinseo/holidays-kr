import {
	array,
	custom,
	everyItem,
	integer,
	isoDate,
	minLength,
	number,
	pipe,
	regex,
	startsWith,
	string,
	transform,
} from 'valibot';

export const PresetsKeyToYearSchema = pipe(
	string(),
	regex(/^y2\d{3}$/),
	transform((v) => Number(v.substring(1))),
	number(),
	integer(),
);

export const PresetsKeysToYearsSchema = pipe(
	array(PresetsKeyToYearSchema),
	everyItem((year, index, array) => !index || year === array[index - 1] + 1),
);

export const createPresetKeysSchema = (year: number) =>
	pipe(
		array(
			pipe(
				string(),
				isoDate(),
				startsWith(`${year}-`),
				// new Date() does not throw error
				// new Date('2024-06-31'); // Mon Jul 01 2024
			),
		),
		everyItem((date, index, array) => !index || date > array[index - 1]),
	);

export const PresetValuesToSubjectsSchema = pipe(
	array(
		pipe(
			array(
				pipe(
					custom((input) => typeof input === 'string' && input.trim() === input),
					string(),
					minLength(1),
				),
			),
			minLength(1),
		),
	),
	transform((subjectsArray) =>
		subjectsArray.reduce((set, subjects) => {
			for (const subject of subjects) set.add(subject);
			return set;
		}, new Set<string>()),
	),
);
