import { writeFile } from 'node:fs/promises';
import holidays from './input/2023.json' assert { type: 'json' };
import { generateCsv } from './script/csv.mjs';
import { generateIcs, generateIcsEvents } from './script/ics.mjs';

const year = 2023;

for (const date in holidays) {
	const subject = holidays[date];
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Incorrect date format');
	if (typeof subject !== 'string') throw new Error('Incorrect subject format');
	if (!subject) throw new Error('Subject should not be empty');
};

await writeFile(`./output/${year}.csv`, generateCsv(holidays));
await writeFile(`./output/${year}.ics`, generateIcs(generateIcsEvents(holidays)));
