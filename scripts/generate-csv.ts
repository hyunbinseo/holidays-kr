import type { Year } from '../index';

export const generateCsv = (preset: Year) => {
	let string = '\ufeff' + 'Start date,Subject';
	for (const [date, subject] of preset) string += `\n${date},${subject}`;
	return string;
};
