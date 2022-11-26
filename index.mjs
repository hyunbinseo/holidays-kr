import { writeFile } from 'node:fs/promises';
import ids from './input/ids.json' assert { type: 'json' };
import presets from './input/presets.json' assert { type: 'json' };
import { generateCsv } from './script/csv.mjs';
import { generateIcs, generateIcsEvents } from './script/ics.mjs';

/** @type {string} */
const year = '2023';

const id = ids[year];
const dates = presets[year];

if (!id || typeof id !== 'number') throw new Error('Invalid ID format');
if (!dates || typeof dates !== 'object' || !Object.keys(dates).length) throw new Error('Invalid dates format');

for (const date in dates) {
	const subject = dates[date];
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date format. ${date} should in YYYY-MM-DD format`);
	if (date.substring(0, 4) !== year) throw new Error(`Invalid date value. ${date} should be a date in year ${year}`);
	if (!subject || typeof subject !== 'string') throw new Error(`Invalid subject format. Subject of ${date} should be a truthy string`);
};

await writeFile(`./output/${year}.csv`, generateCsv(dates));
await writeFile(`./output/${year}.ics`, generateIcs(generateIcsEvents(dates, id)));
