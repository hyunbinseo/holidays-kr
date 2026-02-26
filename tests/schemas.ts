import {
	array,
	custom,
	digits,
	everyItem,
	integer,
	length,
	minLength,
	pipe,
	startsWith,
	string,
	transform,
} from 'valibot';

export const PresetsKeyToYearSchema = pipe(
	string(),
	length(5),
	startsWith('y'),
	transform((v) => v.slice(1)),
	digits(),
	transform(Number),
	integer(),
);

export const PresetsKeysToYearsSchema = pipe(
	array(PresetsKeyToYearSchema),
	everyItem((cur, idx, arr) => !idx || cur === arr[idx - 1]! + 1),
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
